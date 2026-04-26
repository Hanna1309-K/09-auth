export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "@/lib/api/api";
import { logErrorResponse } from "../../_utils/utils";
import { isAxiosError } from "axios";

export async function GET() {
    try {
        const cookieStore = await cookies();

        const cookieHeader = cookieStore
            .getAll()
            .map((c) => `${c.name}=${c.value}`)
            .join("; ");

        const res = await api.get("/auth/session", {
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
                { error: error.message },
                { status: error.response?.status || 500 }
            );
        }

        logErrorResponse({ message: (error as Error).message });

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}