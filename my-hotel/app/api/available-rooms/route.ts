import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

function isValidDateString(d: string) {
  const t = Date.parse(d);
  return !Number.isNaN(t);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const roomIdParam = searchParams.get('roomId') || searchParams.get('room'); // accept either

  console.debug('[available-rooms] incoming', { startDate, endDate, roomIdParam });

  if (!startDate || !endDate) {
    return NextResponse.json({ error: 'startDate and endDate are required' }, { status: 400 });
  }

  if (!isValidDateString(startDate) || !isValidDateString(endDate)) {
    return NextResponse.json({ error: 'startDate or endDate is not a valid date' }, { status: 400 });
  }

  if (new Date(startDate) >= new Date(endDate)) {
    return NextResponse.json({ error: 'startDate must be before endDate' }, { status: 400 });
  }

  try {
    // If a specific roomId was provided, return availability + any conflicting bookings for that room
    if (roomIdParam) {
      const roomId = Number(roomIdParam);
      if (!Number.isInteger(roomId) || roomId <= 0) {
        return NextResponse.json({ error: 'roomId must be a positive integer' }, { status: 400 });
      }

      // Find bookings that overlap the requested date range for that room
      // Overlap condition: booking.check_in < endDate AND booking.check_out > startDate
      const conflicts = await query<any[]>(
        `SELECT id, full_name, email, phone, check_in, check_out, guests, roomId
         FROM booking
         WHERE roomId = ?
           AND check_in < ?
           AND check_out > ?
         ORDER BY check_in ASC`,
        [roomId, endDate, startDate]
      );

      const available = conflicts.length === 0;
      return NextResponse.json({ roomId, available, conflicts });
    }

    // No roomId -> return list of rooms that have NO overlapping bookings in the requested range
    // Exclude rooms that have any booking where check_in < endDate AND check_out > startDate
    const availableRooms = await query<any[]>(`
      SELECT 
        r.id, 
        r.name, 
        r.description,
        r.price, 
        r.capacity,
        r.size,
        r.images, 
        r.equipment,
        CAST(r.type AS CHAR) AS room_type, 
        r.created_at, 
        r.updated_at
      FROM rooms r
      WHERE r.id NOT IN (
        SELECT b.roomId
        FROM booking b
        WHERE b.check_in < ?
          AND b.check_out > ?
      )
      ORDER BY r.id DESC
    `, [endDate, startDate]);

    // Process images and equipment (same shape as before)
    const processedRooms = availableRooms.map(r => {
      let imagesArr: string[] = [];
      try {
        if (r.images) {
          imagesArr = typeof r.images === 'string' ? JSON.parse(r.images) : r.images;
        }
      } catch {
        imagesArr = [];
      }

      let equipmentArr: string[] = [];
      try {
        if (r.equipment) {
          equipmentArr = typeof r.equipment === 'string' ? JSON.parse(r.equipment) : r.equipment;
        }
      } catch {
        equipmentArr = [];
      }

      return {
        id: r.id,
        name: r.name,
        price: Number(r.price),
        capacity: r.capacity,
        size: r.size?.toString() ?? '20m²',
        description: r.description ? r.description.toString() : '',
        images: imagesArr,
        equipment: equipmentArr,
        type: r.room_type,
        created_at: r.created_at,
        updated_at: r.updated_at,
      };
    });

    return NextResponse.json(processedRooms);
  } catch (error) {
    console.error('Error fetching available rooms:', error);

    const message = process.env.NODE_ENV === 'production'
      ? 'Failed to fetch available rooms (server error)'
      : `Failed to fetch available rooms: ${String(error)}`;

    return NextResponse.json({ error: message }, { status: 500 });
  }
}