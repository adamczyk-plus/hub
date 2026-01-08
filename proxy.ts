import { NextRequest, NextResponse } from "next/server";
import { getJwtPayload } from "@/lib/auth/jwt";

export async function proxy(req: NextRequest) {
  const publicPaths = ["/auth/login"];
  const url = req.nextUrl.clone();
  const payload = await getJwtPayload();

  console.debug(payload);

  if (!publicPaths.includes(url.pathname)) {
    if (!payload) {
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }
  }

  // else if (url.pathname === "/" && payload) {
  //   url.pathname = "/home";
  //   return NextResponse.redirect(url);
  // }

  return NextResponse.next();
  // return NextResponse.redirect(new URL("/home", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
