import { NextRequest, NextResponse } from "next/server";

// Auth is enforced client-side via layout guards (useAuth hook).
// Firebase client SDK does not set server-readable session cookies,
// so cookie-based middleware protection cannot work here.
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
