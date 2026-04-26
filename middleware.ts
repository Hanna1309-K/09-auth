import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    console.log("COOKIES:", req.cookies.getAll());
    console.log("MIDDLEWARE WORKS");
    const token =
        req.cookies.get("token")?.value ||
        req.cookies.get("access_token")?.value ||
        req.cookies.get("accessToken")?.value ||
        req.cookies.get("refreshToken")?.value;
    const { pathname } = req.nextUrl;

    const isAuthPage =
        pathname.startsWith("/sign-in") ||
        pathname.startsWith("/sign-up");

    const isPrivatePage =
        pathname.startsWith("/profile") ||
        pathname.startsWith("/notes");

    if (!token && isPrivatePage) {
        return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/profile", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};