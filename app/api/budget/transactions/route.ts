import { query } from "@/lib/db/db";
import { UUID } from "crypto";

export interface TransactionRow {
  id: UUID;
  amount: string;
  category_id: UUID;
  created_at: string;
  date: string;
  description: string;
  store_id: string | null;
}

export interface Transaction {
  id: UUID;
  amount: number;
  categoryId: UUID;
  createdAt: Date;
  date: Date;
  description: string;
  storeId: UUID | null;
}

export async function GET() {
  const mapper = ({ amount, category_id, created_at, date, store_id, ...row }: TransactionRow) => ({
    ...row,
    amount: Number(amount),
    categoryId: category_id,
    createdAt: new Date(created_at),
    date: new Date(date),
    storeId: store_id,
  });
  const sql = "select * from budget.transactions";
  const rows = await query<TransactionRow>(sql);
  return Response.json(rows.map(mapper));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const date = new Date(body.date);
    const amount = parseFloat(body.amount.replaceAll(",", "."));

    const sql = `insert into budget.transactions
    (amount, description, date, category_id, store_id)
    values ($1, $2, $3, $4, $5)`;
    await query(sql, [amount, body.description, date, body.categoryId || null, body.storeId || null]);

    return Response.json({ message: "Transakcja dodana" }, { status: 201 });
  } catch (error) {
    console.error(error);

    return Response.json({ message: "Błąd dodania transakcji" }, { status: 500 });
  }
}
