import { NextRequest, NextResponse } from "next/server";
import { checkSession } from "@/lib/api/serverApi";
import { cookies } from "next/headers";

export async function proxy(req: NextRequest) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;
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

            const newAccessToken =
                (sessionResponse as { accessToken?: string })?.accessToken;

            if (newAccessToken) {
                token = newAccessToken;

                const redirect = NextResponse.redirect(req.url);
                redirect.cookies.set("accessToken", newAccessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "lax",
                    path: "/",
                });
                return redirect;
            }
            token = undefined;
        }
        catch {
            // ignore
        }
    }

    // 🔒 private
    if (!token && isPrivatePage) {
        return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // 🚫 auth для залогінених
    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}
