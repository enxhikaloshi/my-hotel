import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: Request) {
    try {
        // Marrim parametrin 'type' nga URL (p.sh. /api/treatments?type=voucher)
        const { searchParams } = new URL(req.url);
        const type = searchParams.get('type');

        let sql = "";
        
        if (type === 'voucher') {
            // list for gift vouchers
           sql = "SELECT * FROM treatments WHERE is_voucher_eligible = 1 OR is_voucher_eligible = true ORDER BY category ASC";
        } else {
            // list for the main page
            sql = "SELECT * FROM treatments WHERE show_in_main_list = 1 ORDER BY category ASC";
        }

        const treatments = await query<any[]>(sql);

        return NextResponse.json(treatments, { status: 200 });

    } catch (error: any) {
        console.error("Database Error:", error);
        return NextResponse.json({ error: "Error while trying to get the infromation" }, { status: 500 });
    }
}