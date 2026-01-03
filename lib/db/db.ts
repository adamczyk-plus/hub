import { Pool, QueryResultRow } from "pg";
import { isProduction } from "../env";

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  ssl: isProduction && { rejectUnauthorized: false },
});

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: string[]
) {
  const { rows } = await pool.query<T>(text, params);
  return rows;
}
