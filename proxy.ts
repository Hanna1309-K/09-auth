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

    if (!accessToken && refreshToken) {
        try {
            const sessionResponse = await checkSession();

            const headers = (sessionResponse as unknown as Response).headers;
            const setCookie = headers.get("set-cookie");

            const response = NextResponse.next();

            if (setCookie) {
                response.headers.set("set-cookie", setCookie);

                const newAccessToken = (sessionResponse as unknown as {
                    accessToken?: string;
                })?.accessToken;

                token = newAccessToken || accessToken;

                return response; // <-- КРИТИЧНО: одразу повертаємо
            }

            const newAccessToken = (sessionResponse as unknown as {
                accessToken?: string;
            })?.accessToken;

            token = newAccessToken || accessToken;
        } catch {
            token = undefined;
        }
    }

    if (!token && isPrivatePage) {
        return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}