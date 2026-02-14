import { NextRequest, NextResponse } from "next/server";
import { getJwtPayload } from "@/lib/auth/jwt";
import { env } from "process";

const origin = `${env.APP_PROTO}://${env.APP_HOST}${env.APP_PORT}`;

export async function proxy(req: NextRequest) {
  const publicPaths = ["/auth/login"];
  const url = req.nextUrl.clone();
  const payload = await getJwtPayload();

  if (!publicPaths.includes(url.pathname) && !payload) {
    const url = new URL("/auth/login", origin);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
