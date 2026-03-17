import { query } from "@/lib/db/db";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sql = "delete from budget.transactions where id = $1";
  await query(sql, [id]);
  return Response.json({ testowoo: 27 });
}
