import { type NextRequest, NextResponse } from "next/server";

/**
 * ProgressEye Web Proxy (Next.js 16)
 * Handles API proxying and request passing
 */
export default function proxy(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
