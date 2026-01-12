"use server";

import { query } from "@/lib/db/db";
import { revalidatePath } from "next/cache";

export interface AddFillUpPayload {
  odo: number;
  liters: number;
  pricePerLiter: number;
  notes: string;
  date: string;
  discount: number;
}

export async function addFillUp(payload: AddFillUpPayload) {
  try {
    const { liters, pricePerLiter, odo, notes, date, discount } = payload;
    const sql = `insert into fill_ups
      (date, liters, price_per_liter, odo_counter, notes, discount)
      values ($5, $1, $2, $3, $4, $6)`;
    await query(sql, [liters, pricePerLiter, odo, notes, date, discount]);

    revalidatePath("/car");
  } catch (error) {
    return error instanceof Error ? error.message : "Wystąpił błąd";
  }
}
