import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";



export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const now = new Date().toISOString();
    console.log(token)
    if (!token) {
        console.log(`[${now}] Anonymous access to ${req.nextUrl.pathname}`);
        return NextResponse.redirect(new URL("/", req.url));
    }
    console.log(`[${now}] Authenticated access by ${token.name || token.email || token.sub} to ${req.nextUrl.pathname}`);
    return NextResponse.next();
}
