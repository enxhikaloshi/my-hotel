import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  if (!startDate || !endDate) {
    return NextResponse.json({ error: 'startDate and endDate are required' }, { status: 400 });
  }

  try {
    // Query direkt për dhomat e disponueshme
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
        SELECT b.room_id 
        FROM bookings b
        WHERE (
          b.check_in <= ? AND b.check_out >= ?
        ) OR (
          b.check_in BETWEEN ? AND ?
        ) OR (
          b.check_out BETWEEN ? AND ?
        )
      )
      ORDER BY r.id DESC
    `, [
      endDate, startDate,
      startDate, endDate,
      startDate, endDate
    ]);

    // Process images and equipment
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
    return NextResponse.json({ error: 'Failed to fetch available rooms' }, { status: 500 });
  }
}