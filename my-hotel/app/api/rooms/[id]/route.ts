import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Përcaktojmë që params është Promise
) {
  try {
    // KJO ËSHTË ZGJIDHJA: Duhet await për params
    const resolvedParams = await params;
    const roomId = resolvedParams.id;

    if (!roomId) {
      return NextResponse.json({ error: 'ID is missing' }, { status: 400 });
    }

    console.log("Duke kërkuar dhomën me ID:", roomId);

    const sqlQuery = 'SELECT * FROM rooms WHERE id = ?';
    
    // Ekzekutojmë query-n
    const rows = await query(sqlQuery, [roomId]) as any[];

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    const room = rows[0];

    // Rregullojmë formatin e imazheve (nga string në array)
    if (room.images && typeof room.images === 'string') {
      try {
        room.images = JSON.parse(room.images);
      } catch (e) {
        room.images = room.images.split(',').map((img: string) => img.trim());
      }
    }

    return NextResponse.json(room);

  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}