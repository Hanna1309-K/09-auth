import { NextRequest, NextResponse } from "next/server";
import { checkSession } from "@/lib/api/serverApi";

export async function proxy(req: NextRequest) {
    const accessToken = req.cookies.get("accessToken")?.value;
    const refreshToken = req.cookies.get("refreshToken")?.value;

    const { pathname } = req.nextUrl;

    const isAuthPage =
        pathname.startsWith("/sign-in") ||
        pathname.startsWith("/sign-up");

    const isPrivatePage =
        pathname.startsWith("/profile") ||
        pathname.startsWith("/notes");

    let token = accessToken;

    // 🔥 якщо нема accessToken, але є refreshToken → пробуємо відновити сесію
    if (!accessToken && refreshToken) {
        try {
            const session = await checkSession();

            if (session) {
                token = refreshToken;
            }
        } catch {
            token = undefined;
        }
    }

    // 🔒 не авторизований → приватні сторінки
    if (!token && isPrivatePage) {
        return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // 🔓 авторизований → сторінки auth
    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}