import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import nodemailer from 'nodemailer'; 

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { personalInfo, voucherInfo, paymentMethod } = body;

        const orderRef = `AT-${Date.now().toString().slice(-6)}`;
        
        // Sigurohemi që ID-ja të jetë 1 ose 2 siç i shtuam në SQL lart
        const finalVoucherId = (voucherInfo.id === 101 || voucherInfo.id === 1) ? 1 : 2;

        // INSERT te voucher_orders (duke përdorur emrat e kolonave që më dërgove)
        const result = await query<any>(
            `INSERT INTO voucher_orders (
                order_reference, 
                voucher_id, 
                customer_name, 
                customer_email, 
                total_amount, 
                payment_status, 
                payment_method, 
                treatments_list
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                orderRef,
                finalVoucherId,
                `${personalInfo.firstName} ${personalInfo.lastName}`,
                personalInfo.email,
                voucherInfo.totalPrice,
                'completed', // Statusi
                paymentMethod || 'Credit Card',
                voucherInfo.treatmentsList // JSON string
            ]
        );

        // NODEMAILER
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email për klientin
        await transporter.sendMail({
            from: `"Alpen Tesitin" <${process.env.EMAIL_USER}>`,
            to: personalInfo.email,
            subject: 'Your Gift Voucher - Alpen Tesitin',
            html: `<h3>Your voucher ${orderRef} is confirmed!</h3>` // Mund ta pasurosh më vonë
        });

        return NextResponse.json({ 
            success: true, 
            orderId: result.insertId,
            reference: orderRef
        });

    } catch (error: any) {
        console.error("Database/Mail Error:", error.message);
        return NextResponse.json(
            { error: "Error: " + error.message }, 
            { status: 500 }
        );
    }
}