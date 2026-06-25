import { query } from "@/lib/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const sql = "delete from finance.operations where id = $1";
    await query(sql, [id]);

    return NextResponse.json({ success: true, deletedId: id });
  } catch {
    return NextResponse.json({ error: "Nie udało się usunąć operacji" }, { status: 500 });
  }
}
