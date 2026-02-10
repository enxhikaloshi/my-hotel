'use server';
import { query } from '@/lib/db';

// ----------------------
// TYPES
// ----------------------
export type DealInput = {
  title: string;
  description?: string;
  minimum_stay: number;
  valid_from: string; // YYYY-MM-DD
  valid_to: string;   // YYYY-MM-DD
  included_services?: string;
  image?: string;
};

export type Deal = {
  id: number;
  title: string;
  description?: string;
  minimum_stay: number;
  valid_from: string;
  valid_to: string;
  included_services?: string;
  image?: string;
  created_at: string;
  updated_at: string;
};

// ----------------------
// LIST deals
// ----------------------
export async function getDeals(limit = 50, offset = 0): Promise<Deal[]> {
  const rows = await query<any[]>(`
    SELECT id, title, description, minimum_stay, valid_from, valid_to, included_services, image, created_at, updated_at
    FROM hotel_deals
    ORDER BY id DESC
    LIMIT ${limit} OFFSET ${offset}
  `);

  return rows.map(r => ({
    id: r.id,
    title: r.title,
    description: r.description ?? '',
    minimum_stay: Number(r.minimum_stay),
    valid_from: r.valid_from,
    valid_to: r.valid_to,
    included_services: r.included_services ?? '',
    image: r.image ?? '',
    created_at: r.created_at,
    updated_at: r.updated_at,
  }));
}

// ----------------------
// GET single deal by ID
// ----------------------
export async function getDealById(id: number): Promise<Deal | null> {
  const rows = await query<any[]>(`
    SELECT id, title, description, minimum_stay, valid_from, valid_to, included_services, image, created_at, updated_at
    FROM hotel_deals
    WHERE id = ?
    LIMIT 1
  `, [id]);

  if (!rows || rows.length === 0) return null;

  const r = rows[0];

  return {
    id: r.id,
    title: r.title,
    description: r.description ?? '',
    minimum_stay: Number(r.minimum_stay),
    valid_from: r.valid_from,
    valid_to: r.valid_to,
    included_services: r.included_services ?? '',
    image: r.image ?? '',
    created_at: r.created_at,
    updated_at: r.updated_at,
  };
}

// ----------------------
// CREATE new deal
// ----------------------
export async function createDeal(data: DealInput): Promise<{ insertId: number }> {
  if (!data.title || typeof data.minimum_stay !== 'number') {
    throw new Error('Invalid input');
  }

  const [result] = await query<any>(
    `INSERT INTO hotel_deals (title, description, minimum_stay, valid_from, valid_to, included_services, image)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.title,
      data.description ?? null,
      data.minimum_stay,
      data.valid_from,
      data.valid_to,
      data.included_services ?? null,
      data.image ?? null,
    ]
  );

  return { insertId: (result as any).insertId };
}

// ----------------------
// UPDATE existing deal
// ----------------------
export async function updateDeal(id: number, data: Partial<DealInput>): Promise<void> {
  const fields: string[] = [];
  const params: any[] = [];

  if (data.title !== undefined) { fields.push('title = ?'); params.push(data.title); }
  if (data.description !== undefined) { fields.push('description = ?'); params.push(data.description); }
  if (data.minimum_stay !== undefined) { fields.push('minimum_stay = ?'); params.push(data.minimum_stay); }
  if (data.valid_from !== undefined) { fields.push('valid_from = ?'); params.push(data.valid_from); }
  if (data.valid_to !== undefined) { fields.push('valid_to = ?'); params.push(data.valid_to); }
  if (data.included_services !== undefined) { fields.push('included_services = ?'); params.push(data.included_services); }
  if (data.image !== undefined) { fields.push('image = ?'); params.push(data.image); }

  if (fields.length === 0) return;

  const sql = `UPDATE hotel_deals SET ${fields.join(', ')} WHERE id = ?`;
  params.push(id);
  await query(sql, params);
}

// ----------------------
// DELETE deal
// ----------------------
export async function deleteDeal(id: number): Promise<void> {
  await query(`DELETE FROM hotel_deals WHERE id = ?`, [id]);
}
