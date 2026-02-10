'use server';
import { query } from '@/lib/db';

// ----------------------
// TYPES
// ----------------------
export type RoomInput = {
  name: string;
  price: number;
  description?: string;
  capacity?: string;
  size?: string;
  images?: string[];
  equipment?: string[];
  type?: 'single' | 'double' | 'suite';
};

export type Room = {
  id: number;
  name: string;
  price: number;
  capacity: string;
  size: string;
  description?: string;
  images: string[];
  equipment: string[];
  type: 'single' | 'double' | 'suite';
  created_at: string;
  updated_at: string;
};

// ----------------------
// LIST rooms
// ----------------------
export async function getRooms(limit = 50, offset = 0): Promise<Room[]> {
  const rows = await query<any[]>(`
    SELECT 
      id, 
      name, 
      description,
      price, 
      capacity,
      size,
      images, 
      equipment,        
      CAST(type AS CHAR) AS room_type, 
      created_at, 
      updated_at
    FROM rooms
    ORDER BY id DESC
    LIMIT ${limit} OFFSET ${offset}
  `);

  return rows.map(r => {
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
}

// ----------------------
// GET single room by ID
// ----------------------
export async function getRoomById(id: number): Promise<Room | null> {
  const rows = await query<any[]>(`
    SELECT 
      id, 
      name, 
      description, 
      price, 
      capacity,
      size,
      images, 
      equipment,
      CAST(type AS CHAR) AS room_type, 
      created_at, 
      updated_at
    FROM rooms
    WHERE id = ? 
    LIMIT 1
  `, [id]);

  if (!rows || rows.length === 0) return null;

  const r = rows[0];

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
    size: r.size,
    description: r.description ? r.description.toString() : '',
    images: imagesArr,
    equipment: equipmentArr,
    type: r.room_type,
    created_at: r.created_at,
    updated_at: r.updated_at,
  };
}

// ----------------------
// CREATE new room
// ----------------------
export async function createRoom(data: RoomInput): Promise<{ insertId: number }> {
  if (!data.name || typeof data.price !== 'number') {
    throw new Error('Invalid input');
  }

  const imagesJson = JSON.stringify(data.images ?? []);
  const equipmentJson = JSON.stringify(data.equipment ?? []);

  const [result] = await query<any>(
    `INSERT INTO rooms (name, description, price, capacity, size, images, equipment, type)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.name,
      data.description ?? null,
      data.price,
      data.capacity ?? '1 person',
      data.size ?? '20m²',
      imagesJson,
      equipmentJson,
      data.type ?? 'single'
    ]
  );

  return { insertId: (result as any).insertId };
}

// ----------------------
// UPDATE existing room
// ----------------------
export async function updateRoom(id: number, data: Partial<RoomInput>): Promise<void> {
  const fields: string[] = [];
  const params: any[] = [];

  if (data.name !== undefined) { fields.push('name = ?'); params.push(data.name); }
  if (data.description !== undefined) { fields.push('description = ?'); params.push(data.description); }
  if (data.price !== undefined) { fields.push('price = ?'); params.push(data.price); }
  if (data.capacity !== undefined) { fields.push('capacity = ?'); params.push(data.capacity); }
  if (data.size !== undefined) { fields.push('size = ?'); params.push(data.size); }
  if (data.images !== undefined) { fields.push('images = ?'); params.push(JSON.stringify(data.images)); }
  if (data.equipment !== undefined) { fields.push('equipment = ?'); params.push(JSON.stringify(data.equipment)); }
  if (data.type !== undefined) { fields.push('type = ?'); params.push(data.type); }

  if (fields.length === 0) return;

  const sql = `UPDATE rooms SET ${fields.join(', ')} WHERE id = ?`;
  params.push(id);
  await query(sql, params);
}

// ----------------------
// DELETE room
// ----------------------
export async function deleteRoom(id: number): Promise<void> {
  await query(`DELETE FROM rooms WHERE id = ?`, [id]);
}
