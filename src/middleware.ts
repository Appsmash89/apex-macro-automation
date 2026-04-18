import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

/**
 * MISSION 4.4: OPEN ACCESS PROTOCOL
 * Security de-escalated for Alpha testing. 
 * Bypassing authentication gate.
 */
export function middleware(request: NextRequest) {
  // Always allow access during Alpha phase
  return NextResponse.next();
}

// Ensure it runs on all dashboard routes except for api/_next/static/favicon
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
