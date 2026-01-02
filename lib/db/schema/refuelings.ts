import { QueryResultRow } from "pg";

export interface RefuelingsRow extends QueryResultRow {
  id: number;
  date: Date;
  liters: number;
  price_per_liter: number;
  odometer: number;
  notes: string;
}

export interface RefuelingsRecord {
  id: number;
  date: string;
  liters: number;
  pricePerLiter: number;
  odometer: number;
  notes: string;
}
