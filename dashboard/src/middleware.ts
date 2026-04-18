import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

export function middleware(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  // 1. If no password is set, allow all traffic
  if (!adminPassword || adminPassword === "your_secure_password_here") {
    return NextResponse.next();
  }

  // 2. Define protected paths
  const isLoginPage = request.nextUrl.pathname === '/login';
  const sessionToken = request.cookies.get('session-auth')?.value;

  // 3. Simple auth check
  if (!sessionToken && !isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Ensure it runs on all dashboard routes except for api/_next/static/favicon
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
