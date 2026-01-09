"use server";

import { query } from "@/lib/db/db";

export interface AddFillUpPayload {
  odo: number;
  liters: number;
  pricePerLiter: number;
  notes: string;
  date: string;
}

export async function addFillUp(payload: AddFillUpPayload) {
  try {
    const { liters, pricePerLiter, odo, notes, date } = payload;
    const sql = `insert into fill_ups
      (date, liters, price_per_liter, odo_counter, notes)
      values ($5, $1, $2, $3, $4)`;
    await query(sql, [liters, pricePerLiter, odo, notes, date]);
  } catch (error) {
    return error instanceof Error ? error.message : "Wystąpił błąd";
  }
}
