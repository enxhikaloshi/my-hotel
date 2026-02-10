// app/api/deals/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getDeals, createDeal } from './actions';
import { z } from 'zod';

// ----------------------------------------------
// Zod schema për input kur krijohet një ofertë
// ----------------------------------------------
const DealSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  minimum_stay: z.number().positive(),
  valid_from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
  valid_to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),   // YYYY-MM-DD
  included_services: z.string().optional(),
  image: z.string().optional(),
});

// ----------------------------------------------
// GET - Merr të gjitha ofertat
// ----------------------------------------------
export async function GET(req: NextRequest) {
  try {
    const deals = await getDeals();

    return NextResponse.json(deals);
  } catch (err) {
    console.error('GET /api/deals error:', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// ----------------------------------------------
// POST - Krijo një ofertë të re
// ----------------------------------------------
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = DealSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    const data = parsed.data;

    const result = await createDeal(data);

    return NextResponse.json({ message: 'Deal created', dealId: result.insertId }, { status: 201 });
  } catch (err) {
    console.error('POST /api/deals error:', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
