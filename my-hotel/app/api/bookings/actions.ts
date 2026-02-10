'use server';
import { query } from '@/lib/db';
import nodemailer from 'nodemailer';


export type BookingInput = {
  room_id: number;
  full_name: string;
  email: string;
  phone?: string;
  check_in: string;  
  check_out: string; 
  guests?: number;
};

export type Booking = {
  id: number;
  room_id: number;
  full_name: string;
  email: string;
  phone: string | null;
  check_in: string;
  check_out: string;
  guests: number;
  created_at: string;
  updated_at: string;
};

// ----------------------------------------
// GET ALL BOOKINGS
// ----------------------------------------
export async function getBookings(): Promise<Booking[]> {
  const rows = await query<Booking[]>(
    `SELECT * FROM booking ORDER BY created_at DESC`
  );
  return rows;
}

// ----------------------------------------
// GET BOOKING BY ID
// ----------------------------------------
export async function getBookingById(id: number): Promise<Booking | null> {
  const rows = await query<Booking[]>(
    `SELECT * FROM booking WHERE id = ? LIMIT 1`,
    [id]
  );
  return rows.length > 0 ? rows[0] : null;
}

// ----------------------------------------
// GET BOOKINGS FOR SPECIFIC ROOM
// ----------------------------------------
export async function getBookingsByRoom(roomId: number): Promise<Booking[]> {
  const rows = await query<Booking[]>(
    `SELECT * FROM booking WHERE room_id = ? ORDER BY check_in ASC`,
    [roomId]
  );
  return rows;
}

// ----------------------------------------
// CREATE BOOKING
// ----------------------------------------
export async function createBooking(data: any) {
  try {
    // Përdorim vetëm roomId pasi room_id e fshimë
    const sql = `
      INSERT INTO booking 
      (roomId, full_name, email, phone, check_in, check_out, guests) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      data.room_id,    // Kjo vjen nga front-endi (id e dhomës)
      data.full_name,
      data.email,
      data.phone || null,
      data.check_in,
      data.check_out,
      data.guests || 1
    ];

    const result = await query<any>(sql, params);

    // ---  Nodemailer Logic ---
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Alpen Tesitin" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: 'Reservation Confirmed - Alpen Tesitin',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
          <h2 style="color: #a3cc85;">Booking Confirmed!</h2>
          <p>Dear <strong>${data.full_name}</strong>,</p>
          <p>Your stay at Alpen Tesitin has been successfully booked.</p>
          <div style="background: #f8fbf8; padding: 15px; border-left: 4px solid #a3cc85;">
            <p><strong>Check-in:</strong> ${data.check_in}</p>
            <p><strong>Check-out:</strong> ${data.check_out}</p>
            <p><strong>Guests:</strong> ${data.guests}</p>
          </div>
          <p style="margin-top: 20px;">We look forward to welcoming you!</p>
        </div>
      `,
    });

    return { success: true, insertId: result.insertId };
  } catch (error) {
    console.error("Booking Error:", error);
    throw error;
  }
}


// ----------------------------------------
// UPDATE BOOKING
// ----------------------------------------
export async function updateBooking(id: number, data: Partial<BookingInput>): Promise<void> {
  const fields: string[] = [];
  const params: any[] = [];

  if (data.room_id !== undefined) { fields.push("room_id = ?"); params.push(data.room_id); }
  if (data.full_name !== undefined) { fields.push("full_name = ?"); params.push(data.full_name); }
  if (data.email !== undefined) { fields.push("email = ?"); params.push(data.email); }
  if (data.phone !== undefined) { fields.push("phone = ?"); params.push(data.phone); }
  if (data.check_in !== undefined) { fields.push("check_in = ?"); params.push(data.check_in); }
  if (data.check_out !== undefined) { fields.push("check_out = ?"); params.push(data.check_out); }
  if (data.guests !== undefined) { fields.push("guests = ?"); params.push(data.guests); }

  if (fields.length === 0) return;

  const sql = `UPDATE booking SET ${fields.join(", ")} WHERE id = ?`;
  params.push(id);
  await query(sql, params);
}

// ----------------------------------------
// DELETE BOOKING
// ----------------------------------------
export async function deleteBooking(id: number): Promise<void> {
  await query(`DELETE FROM booking WHERE id = ?`, [id]);
}
