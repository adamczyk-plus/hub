"use server";

import { encrypt, JwtPayload } from "@/lib/auth/jwt";
import { createConnection } from "@/lib/db";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { RowDataPacket } from "mysql2";

interface UserRow extends RowDataPacket {
  hash: string;
}

export async function login(
  _1: { error?: string },
  { username, password }: { username: string; password: string }
) {
  // const db = await createConnection();
  // const sql = "select password_hash hash from users where username = ?";
  // const [rows] = await db.query<UserRow[]>(sql, [username]);

  // if (!rows.length) return { error: "Nie ma takiego użytkownika" };

  // const match = await bcrypt.compare(password, rows[0].hash);
  // if (!match) return { error: "Niepoprawne hasło" };

  const payload: JwtPayload = { userId: 1, username: "ladamczyk" };
  const token = await encrypt(payload);
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 3600,
  });

  return { error: undefined };
}
