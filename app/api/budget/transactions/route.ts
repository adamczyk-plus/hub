import { query } from "@/lib/db/db";
import { UUID } from "crypto";

export interface OperationRow {
  id: number;
  amount: string;
  category_id: number;
  created_at: string;
  date: string;
  description: string;
  subcategory_id: number | null;
}

export interface Operation {
  id: number;
  amount: number;
  categoryId: number;
  subcategoryId: number;
  createdAt: Date;
  date: Date;
  description: string;
}

export async function GET() {
  const mapper = ({ amount, category_id, created_at, date, subcategory_id, ...row }: OperationRow) => ({
    ...row,
    amount: Number(amount),
    categoryId: category_id,
    createdAt: new Date(created_at),
    date: new Date(date),
    subcategoryId: subcategory_id,
  });
  const sql = "select * from finance.operations";
  const rows = await query<OperationRow>(sql);
  return Response.json(rows.map(mapper));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const date = new Date(body.date);
    const amount = parseFloat(body.amount.replaceAll(",", "."));

    const sql = `insert into finance.operations
    (amount, description, date, category_id, subcategory_id)
    values ($1, $2, $3, $4, $5)`;
    await query(sql, [amount, body.descr, date, body.categoryId || null, body.subcategoryId || null]);

    return Response.json({ message: "Transakcja dodana" }, { status: 201 });
  } catch (error) {
    console.error(error);

    return Response.json({ message: "Błąd dodania transakcji" }, { status: 500 });
  }
}
