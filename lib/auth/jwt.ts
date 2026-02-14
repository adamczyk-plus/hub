import type { JWTPayload } from "jose";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export interface JwtPayload extends JWTPayload {
  username: string;
  userId: number;
}

export async function encrypt(payload: JwtPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("4h")
    .sign(secret);
}

export async function decrypt(input: string) {
  try {
    const { payload } = await jwtVerify(input, secret, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session", error);
    return null;
  }
}

export async function getJwtPayload() {
  const { get } = await cookies();
  const token = get("token")?.value;
  return token ? await decrypt(token) : null;
}
