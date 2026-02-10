import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { personalInfo, stays } = body;

        // 1. Save the main request at enquires
       
        const result = await query<any>(
            `INSERT INTO enquiries (
                title, first_name, last_name, email, phone, street, 
                postcode, city, country, comment, marketing_consent, enquiry_type
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'general')`,
            [
                personalInfo.title || null,
                personalInfo.firstName,
                personalInfo.lastName,
                personalInfo.email,
                personalInfo.phone,
                personalInfo.street || null,
                personalInfo.postcode || null,
                personalInfo.city || null,
                personalInfo.country || null,
                personalInfo.comment || null,
                personalInfo.marketingConsent ? 1 : 0
            ]
        );

        const enquiryId = result.insertId;

        // 2. Save the details of stay(if the rooms are selected)
        if (stays && stays.length > 0) {
            for (const stay of stays) {
                await query(
                    `INSERT INTO enquiry_stays (enquiry_id, start_date, end_date, adults, children, selected_rooms) 
                     VALUES (?, ?, ?, ?, ?, ?)`,
                    [
                        enquiryId,
                        stay.startDate, 
                        stay.endDate,
                        stay.adults,
                        stay.children,
                        JSON.stringify(stay.rooms || []) 
                    ]
                );
            }
        }

        return NextResponse.json({ message: "Enquiry sent successfully", id: enquiryId }, { status: 200 });

    } catch (error: any) {
        console.error("Database Error:", error);
        return NextResponse.json({ error: "Error while trying to save: " + error.message }, { status: 500 });
    }
}