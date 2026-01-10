import { QueryResultRow } from "pg";

export interface FillUpRow extends QueryResultRow {
  id: number;
  date: Date;
  liters: number;
  price_per_liter: number;
  odo_counter: number;
  notes: string;
  discount: number;
}

export interface FillUpRecord {
  id: number;
  date: string;
  liters: number;
  pricePerLiter: number;
  odoCounter: number;
  notes: string;
  discount: number;
}
