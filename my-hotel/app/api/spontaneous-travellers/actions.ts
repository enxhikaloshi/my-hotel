'use server';
import { query } from '@/lib/db';

export type SpontaneousInput = {
  room_id: number;
  new_price: number;
  check_in: string; 
  check_out: string;
  is_active?: boolean;
};

export type SpontaneousDeal = {
  id: number;
  room_id: number;
  new_price: number;
  check_in: string;
  check_out: string;
  is_active: boolean;
  room_name: string;
  room_capacity: string;
  room_size: string;
  room_images: string[];
};

// ----------------------
// LIST deals (me JOIN)
// ----------------------
export async function getSpontaneousDeals(): Promise<SpontaneousDeal[]> {
  const rows = await query<any[]>(`
    SELECT 
      sd.id, 
      sd.room_id, 
      sd.new_price, 
      sd.check_in, 
      sd.check_out, 
      sd.is_active,
      r.name as room_name, 
      r.capacity as room_capacity, 
      r.size as room_size, 
      r.images as room_images
    FROM spontaneous_deals sd
    JOIN rooms r ON sd.room_id = r.id
    WHERE sd.is_active = true AND sd.check_out >= CURRENT_DATE
    ORDER BY sd.check_in ASC
  `);

  return rows.map(r => ({
    ...r,
    new_price: Number(r.new_price),
    room_images: typeof r.room_images === 'string' ? JSON.parse(r.room_images) : r.room_images
  }));
}

// ----------------------
// CREATE deal
// ----------------------
export async function createSpontaneousDeal(data: SpontaneousInput) {
  const result = await query<any>(
    `INSERT INTO spontaneous_deals (room_id, new_price, check_in, check_out)
     VALUES (?, ?, ?, ?)`,
    [data.room_id, data.new_price, data.check_in, data.check_out]
  );
  
  // Varet nga libraria jote (mysql2 kthehet si [result, fields])
  const insertId = (result as any).insertId || (result[0] as any).insertId;
  return { insertId };
}

// ----------------------
// DELETE deal
// ----------------------
export async function deleteSpontaneousDeal(id: number) {
  await query(`DELETE FROM spontaneous_deals WHERE id = ?`, [id]);
}