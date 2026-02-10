import { NextRequest, NextResponse } from 'next/server';
import { getSpontaneousDeals, createSpontaneousDeal } from './actions';
import { z } from 'zod';

// Schema for validation
const DealSchema = z.object({
  room_id: z.number(),
  deal_title: z.string().min(1),
  new_price: z.number().positive(),
  check_in: z.string(),
  check_out: z.string(),
});

// GET 
export async function GET(req: NextRequest) {
  try {
    const deals = await getSpontaneousDeals();
    return NextResponse.json(deals);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch deals' }, { status: 500 });
  }
}

// POST - Shto një ofertë të re
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = DealSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    const result = await createSpontaneousDeal(parsed.data);
    return NextResponse.json({ message: 'Deal created', dealId: result.insertId }, { status: 201 });
  } catch (err) {
    console.error('POST Error:', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}