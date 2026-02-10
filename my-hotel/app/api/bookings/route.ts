import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { loadTranslations } from '@/utils/translations';
import { getRooms } from '../rooms/actions';
import { createBooking, getBookings } from './actions';

// ----------------------------------------------------
// STRING NORMALIZER
// ----------------------------------------------------
function normalizeKey(s: string) {
  return String(s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

// ----------------------------------------------------
// GET BOOKINGS
// ----------------------------------------------------
export async function GET(req: NextRequest) {
  try {
    const lang = req.nextUrl.searchParams.get('lang') || 'en';

    const [bookings, rooms, translations] = await Promise.all([
      getBookings(),
      getRooms(),
      loadTranslations(lang),
    ]);

    const roomMap = Object.fromEntries(rooms.map((r) => [r.id, r]));

    const mappedBookings = bookings
      .map((booking) => {
        const room = roomMap[booking.room_id];
        if (!room) return null;

        const translate = (value?: string) => {
          if (!value) return value;
          return (
            translations[value] ||
            translations[value.toLowerCase?.()] ||
            translations[normalizeKey(value)] ||
            value
          );
        };

        return {
          id: booking.id,
          fullName: booking.full_name,
          email: booking.email,
          phone: booking.phone,
          check_in: booking.check_in,
          check_out: booking.check_out,
          guests: booking.guests,
          room: {
            id: room.id,
            name: translate(room.name),
            description: translate(room.description),
            price: room.price,
            capacity: room.capacity ?? 1,
            images: room.images || [],
          },
        };
      })
      .filter(Boolean);

    return NextResponse.json(mappedBookings);
  } catch (err) {
    console.error('GET /bookings error:', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// ----------------------------------------------------
// VALIDATION SCHEMA
// ----------------------------------------------------
const BookingSchema = z.object({
  room_id: z.number().int().positive(),
  full_name: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().optional(),
  check_in: z.string().refine((d) => !isNaN(Date.parse(d)), {
    message: 'Invalid check-in date',
  }),
  check_out: z.string().refine((d) => !isNaN(Date.parse(d)), {
    message: 'Invalid check-out date',
  }),
  guests: z.number().int().positive().optional(),
});

// ----------------------------------------------------
// CREATE BOOKING
// ----------------------------------------------------
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = BookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.format() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const result = await createBooking({
      room_id: data.room_id,
      full_name: data.full_name,
      email: data.email,
      phone: data.phone,
      check_in: data.check_in,
      check_out: data.check_out,
      guests: data.guests ?? 1,
    });

    return NextResponse.json(
      { message: 'Booking created', bookingId: result.insertId },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('POST /bookings error:', err);

    if (err?.message === 'BOOKED') {
      return NextResponse.json(
        { message: 'Room already booked on that date' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
