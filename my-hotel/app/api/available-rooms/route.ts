import { NextRequest, NextResponse } from 'next/server';
import { getRooms } from '../rooms/actions';
import { getBookings } from '../bookings/actions';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  if (!startDate || !endDate) {
    return NextResponse.json({ error: 'startDate and endDate are required' }, { status: 400 });
  }

  try {
    // 1. Fetch all data from your actions
    const allRooms = await getRooms();
    const allBookings = await getBookings();

    // 2. Parse selected dates once
    const sStart = new Date(startDate).getTime();
    const sEnd = new Date(endDate).getTime();

    // 3. Filter bookings that overlap with the selected range
    const overlappingBookings = allBookings.filter((booking: any) => {
      const bStart = new Date(booking.check_in).getTime();
      const bEnd = new Date(booking.check_out).getTime();

      // Logic: A booking overlaps if it starts BEFORE our search ends
      // AND it ends AFTER our search starts.
      // Using < and > (instead of <=) allows check-in/out on the same day.
      return bStart < sEnd && bEnd > sStart;
    });

    // 4. Extract IDs of rooms that are taken
    const bookedRoomIds = new Set(overlappingBookings.map((b: any) => b.room_id));

    // 5. Return only rooms whose ID is NOT in the booked set
    const availableRooms = allRooms.filter(room => !bookedRoomIds.has(room.id));

    return NextResponse.json(availableRooms);
  } catch (error) {
    console.error('Error fetching available rooms:', error);
    return NextResponse.json({ error: 'Failed to fetch available rooms' }, { status: 500 });
  }
}