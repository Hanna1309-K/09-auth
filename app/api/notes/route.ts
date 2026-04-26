import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/api/api";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../_utils/utils";

export const dynamic = "force-dynamic";

const getCookieHeader = async () => {
    const cookieStore = await cookies();

    return cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");
};

export async function GET(request: NextRequest) {
    try {
        const search = request.nextUrl.searchParams.get("search") ?? "";
        const page = Number(request.nextUrl.searchParams.get("page") ?? 1);
        const rawTag = request.nextUrl.searchParams.get("tag") ?? "";
        const tag = rawTag === "All" ? "" : rawTag;

        const res = await api.get("/notes", {
            params: {
                ...(search && { search }),
                page,
                perPage: 12,
                ...(tag && { tag }),
            },
            headers: {
                Cookie: await getCookieHeader(),
            },
        });

        return NextResponse.json(res.data, { status: res.status });
    } catch (error) {
        if (isAxiosError(error)) {
            logErrorResponse(error.response?.data);

            return NextResponse.json(
                { error: error.message, response: error.response?.data },
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

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const res = await api.post("/notes", body, {
            headers: {
                Cookie: await getCookieHeader(),
                "Content-Type": "application/json",
            },
        });

        return NextResponse.json(res.data, { status: res.status });
    } catch (error) {
        if (isAxiosError(error)) {
            logErrorResponse(error.response?.data);

            return NextResponse.json(
                { error: error.message, response: error.response?.data },
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
