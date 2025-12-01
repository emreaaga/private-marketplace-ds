import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const protectedRoutes = ["/dashboard"];

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (!isProtected) {
    return NextResponse.next();
  }

  const refreshToken = req.cookies.get("refresh_token")?.value;

  if (!refreshToken) {
    const loginUrl = new URL("/auth/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
