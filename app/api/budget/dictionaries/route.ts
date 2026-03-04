import { query } from "@/lib/db/db";
import { UUID } from "crypto";

export interface CategoryRow {
  id: UUID;
  name: string;
  type: "expense" | "income";
  parent_id: UUID | null;
}

export type Category = Omit<CategoryRow, "parent_id"> & { parentId: UUID | null };

export interface Store {
  id: UUID;
  name: string;
}

export async function GET() {
  const result = { stores: await getStores(), categories: await getCategories() };
  return Response.json(result);
}

async function getStores() {
  const sql = "select * from budget.stores";
  return await query<Store>(sql);
}

async function getCategories() {
  const mapper = ({ parent_id, ...row }: CategoryRow): Category => ({ parentId: parent_id, ...row });
  const sql = "select * from budget.categories";
  const rows = await query<CategoryRow>(sql);
  return rows.map(mapper);
}
