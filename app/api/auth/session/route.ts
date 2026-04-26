import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "@/lib/api/api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const cookieStore = await cookies();

        const accessToken = cookieStore.get("accessToken")?.value;
        const refreshToken = cookieStore.get("refreshToken")?.value;

        if (!accessToken && !refreshToken) {
            return NextResponse.json({ success: false });
        }

        const cookieHeader = [
            accessToken && `accessToken=${accessToken}`,
            refreshToken && `refreshToken=${refreshToken}`,
        ]
            .filter(Boolean)
            .join("; ");

        const apiRes = await api.get("/auth/session", {
            headers: {
                Cookie: cookieHeader,
            },
        });

        return NextResponse.json(
            { success: true, user: apiRes.data?.user },
            { status: 200 }
        );
    } catch (error) {
        if (isAxiosError(error)) {
            logErrorResponse(error.response?.data);

            return NextResponse.json(
                { success: false },
                { status: 200 }
            );
        }

        logErrorResponse({ message: (error as Error).message });

        return NextResponse.json(
            { success: false },
            { status: 200 }
        );
    }
}