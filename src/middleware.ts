import { NextRequest, NextResponse } from "next/server";

import { canAccess } from "@/shared/config/permissions";

// eslint-disable-next-line complexity
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;
  const userMetadata = req.cookies.get("user_metadata")?.value;

  if ((accessToken || refreshToken) && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/dashboard/main", req.url));
  }

  if (pathname.startsWith("/dashboard")) {
    // 1. Если нет токенов — на логин
    if (!accessToken && !refreshToken) {
      const loginUrl = new URL("/auth/login", req.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // 2. Сценарий: Access протух, делаем Refresh
    if (!accessToken && refreshToken) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
          method: "POST",
          headers: { Cookie: `refresh_token=${refreshToken}` },
        });

        if (res.ok) {
          const response = NextResponse.next();
          const setCookieHeaders = res.headers.getSetCookie();
          setCookieHeaders.forEach((c) => response.headers.append("set-cookie", c));
          return response;
        }
      } catch (e) {
        console.error("Refresh failed", e);
      }

      // Если рефреш сдох — чистим всё
      const resp = NextResponse.redirect(new URL("/auth/login", req.url));
      resp.cookies.delete("user_metadata");
      return resp;
    }

    // 3. ПРОВЕРКА РОЛЕЙ (RBAC)
    if (userMetadata) {
      try {
        const user = JSON.parse(decodeURIComponent(userMetadata));

        // Исключаем бесконечный редирект для страницы unauthorized
        if (pathname !== "/dashboard/unauthorized") {
          if (!canAccess(pathname, user)) {
            // Rewrite вместо Redirect — URL остается тот же, но контент от страницы 403
            return NextResponse.rewrite(new URL("/dashboard/unauthorized", req.url));
          }
        }
      } catch {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  // Добавляем /auth в матчер, чтобы Middleware следил и за логином
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
