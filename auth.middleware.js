import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const isDev = process.env.NODE_ENV === "development";

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: isDev
      ? "authjs.session-token"
      : "__Secure-authjs.session-token",
  });

  const now = new Date().toISOString();

  if (!token) {
    console.log(`[${now}] Anonymous access to ${req.nextUrl.pathname}`);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  console.log(
    `[${now}] Authenticated access by ${token.name || token.email || token.sub} to ${req.nextUrl.pathname}`
  );
  return NextResponse.next();
}

// Apply middleware only to protected routes
export const config = {
  matcher: ["/welcome"],
};