// app/api/rooms/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { loadTranslations } from '@/utils/translations';
import { getRooms, createRoom } from './actions';
import { z } from 'zod';

// Normalize room name for translation keys
function normalizeKey(s: string) {
  return String(s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

// Ruaj tipin origjinal pas përkthimit
function translateType(type: 'single' | 'double' | 'suite', translations: Record<string, string>) {
  const typeKey = `room_type_${type}`;
  const translatedType = translations[typeKey];
  
  // Kthe përkthimin ose tipin origjinal
  return {
    displayType: translatedType || type, // Për shfaqje në UI
    originalType: type // Ruaj tipin origjinal për logjikën e brendshme
  };
}

export async function GET(req: NextRequest) {
  try {
    // Merr locale nga query parameter
    const locale = req.nextUrl.searchParams.get('locale') || 
                   req.nextUrl.searchParams.get('lang') || 
                   'en';

    // Fetch rooms from DB
    const rooms = await getRooms();

    // Load translations për gjuhën e kërkuar
    const translations = await loadTranslations(locale);

    const mappedRooms = rooms.map((room) => {
      // Translate name
      const exactName = translations[room.name];
      const lowerName = translations[room.name?.toLowerCase?.()];
      const snakeName = translations[normalizeKey(room.name)];
      const name = exactName ?? lowerName ?? snakeName ?? room.name;

      // Translate description
      let description = (room.description ?? '').toString().trim();
      if (description) {
        const exactDesc = translations[description];
        const lowerDesc = translations[description?.toLowerCase?.()];
        const snakeDesc = translations[normalizeKey(description)];
        description = exactDesc ?? lowerDesc ?? snakeDesc ?? description;
      }

      // Translate equipment items nëse janë string array
      let translatedEquipment: string[] = [];
      if (Array.isArray(room.equipment)) {
        translatedEquipment = room.equipment.map((item: string) => {
          const exactItem = translations[item];
          const lowerItem = translations[item?.toLowerCase?.()];
          const snakeItem = translations[normalizeKey(item)];
          return exactItem ?? lowerItem ?? snakeItem ?? item;
        });
      } else {
        translatedEquipment = room.equipment || [];
      }

      // Përkthen tipin dhe ruaj origjinalin
      const typeTranslation = translateType(room.type, translations);

      // Translate capacity nëse është string
      let translatedCapacity = room.capacity ?? '1 person';
      if (typeof translatedCapacity === 'string') {
        const capacityKey = `capacity_${translatedCapacity.replace(/\s+/g, '_')}`;
        const translatedCapacityValue = translations[capacityKey];
        if (translatedCapacityValue) {
          translatedCapacity = translatedCapacityValue;
        }
      }

      console.log('ROOM EQUIPMENT:', room.id, room.equipment);

      return {
        id: room.id,
        name,
        price: room.price,
        capacity: translatedCapacity,
        size: room.size ?? '20m²',
        description: description,
        equipment: translatedEquipment,
        images: room.images || [],
        displayType: typeTranslation.displayType, // Për shfaqje
        type: room.type, // Ruaj tipin origjinal për TypeScript
        originalName: room.name,
        originalDescription: room.description,
      };
    });

    return NextResponse.json(mappedRooms);
  } catch (error) {
    console.error('Error in rooms API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rooms', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// ----------------------------------------------
// POST - Shto një dhomë të re
// ----------------------------------------------
const RoomSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['single', 'double', 'suite']),
  price: z.number().positive(),
  capacity: z.number().optional(),
  size: z.string().optional(),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  equipment: z.array(z.string()).optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = RoomSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
  }

  const data = parsed.data;

  try {
    const result = await createRoom({
      ...data,
      capacity: data.capacity?.toString(),
    });

    return NextResponse.json({ message: 'Room created', roomId: result.insertId }, { status: 201 });
  } catch (err) {
    console.error('Room POST error:', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}