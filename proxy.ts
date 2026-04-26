import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
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

    // 🔒 якщо НЕ авторизований і йде в приватні сторінки
    if (!token && isPrivatePage) {
        return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // 🔓 якщо авторизований і йде на auth сторінки
    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/profile", req.url));
    }

    return NextResponse.next();
}