import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Inject pathname so (root)/layout.tsx can detect the current path
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-invoke-path", pathname);

  const protectedRoutes = ["/dashboard", "/scan", "/result", "/profile"];
  const isProtectedRoute = protectedRoutes.some((r) => pathname.startsWith(r));

  const authRoutes = ["/sign-in", "/sign-up"];
  const isAuthRoute = authRoutes.includes(pathname);

  // Fast cookie-based session check
  const sessionCookie =
    request.cookies.get("better-auth.session_token") ??
    request.cookies.get("__Secure-better-auth.session_token");
  const isAuthenticated = !!sessionCookie;

  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
