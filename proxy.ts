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
    const response = NextResponse.next();

    if (!accessToken && refreshToken) {
        try {
            const sessionResponse = await checkSession();

            const headers = sessionResponse as unknown as Response;
            const setCookie = headers.headers.get("set-cookie");

            const newAccessToken = (sessionResponse as unknown as { accessToken?: string })?.accessToken;

            token = newAccessToken || refreshToken;

            if (setCookie) {
                response.headers.append("set-cookie", setCookie);
            }
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

    return response;
}