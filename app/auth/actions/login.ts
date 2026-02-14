"use server";

import { encrypt } from "@/lib/auth/jwt";
import { query } from "@/lib/db/db";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { isProduction } from "@/lib/env";

export async function login(_1: { error?: string }, { username, password }: { username: string; password: string }) {
  const rows = await query<{ hash: string; id: number }>("select password_hash hash, id from users where login = $1", [
    username,
  ]);
  if (!rows.length) return { error: "Nie ma takiego użytkownika" };

  const [{ hash, id }] = rows;

  const match = await bcrypt.compare(password, hash);
  if (!match) return { error: "Niepoprawne hasło" };

  const token = await encrypt({ userId: id, username });
  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: isProduction,
    maxAge: 14_400,
  });

  return { error: undefined };
}
