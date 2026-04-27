import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TOKEN_COOKIE_NAME } from "@/settings";

export function proxy(request: NextRequest) {
  const token = request.cookies.get(TOKEN_COOKIE_NAME)?.value;

  const isLoginPage = request.nextUrl.pathname === "/login";

  if (isLoginPage && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  /*
  const isProtectedRoute = request.nextUrl.pathname.startsWith("/dashboard");
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  */

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
