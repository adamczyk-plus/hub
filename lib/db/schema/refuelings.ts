import { QueryResultRow } from "pg";

export interface RefuelingsRow extends QueryResultRow {
  id: number;
  date: Date;
  liters: number;
  price_per_liter: number;
  odometer: number;
  notes: string;
}
