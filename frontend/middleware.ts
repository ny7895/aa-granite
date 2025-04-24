// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // only protect /admin and its sub-paths
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("auth_token")?.value;
    if (!token) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/login";
      return NextResponse.redirect(loginUrl);
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/login";
      const res = NextResponse.redirect(loginUrl);
      // delete the expired/invalid cookie
      res.cookies.delete({ name: "auth_token", path: "/" });
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
