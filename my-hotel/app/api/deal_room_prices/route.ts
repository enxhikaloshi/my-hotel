import { query } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const season = searchParams.get('season') || 'winter';
  
  const pricesQuery = `
    SELECT 
      drp.room_id,
      drp.deal_id,
      drp.price_1_to_5_nights,
      drp.price_6_plus_nights
    FROM deal_room_prices drp
    JOIN hotel_deals hd ON drp.deal_id = hd.id
    WHERE hd.season = ?
  `;
  
  const prices = await query(pricesQuery, [season]);
  return NextResponse.json(prices);
}