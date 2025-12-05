import { createConnection } from "@/lib/db";
import { format } from "date-fns";
import { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";

interface RefuelingRows extends RowDataPacket {
  id: number;
  date: Date;
  liters: string;
  price_per_liter: string;
  odometer: number;
  notes: string | null;
}

export interface Refueling {
  id: number;
  date: string;
  liters: number;
  pricePerLiter: number;
  odometer: number;
  notes: string;
}

export async function GET() {
  try {
    const db = await createConnection();
    const sql = "select * from refueling;";
    const [rows] = await db.query<RefuelingRows[]>(sql);

    if (!Array.isArray(rows)) throw new Error("Must be an array!");

    const result: Refueling[] = rows.map(({ date, ...row }) => ({
      id: row.id,
      date: format(date, "yyyy-MM-dd"),
      liters: parseFloat(row.liters),
      pricePerLiter: parseFloat(row.price_per_liter),
      odometer: row.odometer,
      notes: row.notes ?? "",
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    const err = error instanceof Error ? error.message : error;
    return NextResponse.json({ error: err });
  }
}

export async function POST(request: Request) {
  const data: Refueling = await request.json();
  const { date, liters, pricePerLiter, odometer, notes } = data;

  const db = await createConnection();
  const sql = `insert into refueling (date, liters, price_per_liter, odometer, notes)
    values (?, ?, ?, ?, ?)`;
  await db.query(sql, [date, liters, pricePerLiter, odometer, notes]);

  return NextResponse.json({});
}
