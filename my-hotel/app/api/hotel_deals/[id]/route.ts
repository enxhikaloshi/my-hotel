import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    
    const resolvedParams = await params;
    const dealId = resolvedParams.id;

    if (!dealId) {
      return NextResponse.json({ error: 'Deal ID is missing' }, { status: 400 });
    }

    console.log("Duke kërkuar ofertën me ID:", dealId);


    const sqlQuery = 'SELECT * FROM hotel_deals WHERE id = ?';
    const rows = await query(sqlQuery, [dealId]) as any[];

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'Deal not found' }, { status: 404 });
    }

    const deal = rows[0];



    return NextResponse.json(deal);

  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}