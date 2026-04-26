import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "@/lib/api/api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const cookieStore = cookies();

        const cookieHeader = cookieStore.toString();

        const res = await api.get("/users/me", {
            headers: {
                Cookie: cookieHeader,
            },
        });

        return NextResponse.json(res.data, {
            status: res.status,
        });
    } catch (error) {
        if (isAxiosError(error)) {
            logErrorResponse(error.response?.data);

            return NextResponse.json(
                {
                    error: error.message,
                    response: error.response?.data,
                },
                {
                    status: error.response?.status,
                }
            );
        }

        logErrorResponse({ message: (error as Error).message });

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}