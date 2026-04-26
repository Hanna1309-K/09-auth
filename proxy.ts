import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/api/api";

export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get("url");

    if (!url) {
        return NextResponse.json(
            { error: "Missing url" },
            { status: 400 }
        );
    }

    try {
        const res = await api.get(url);

        return NextResponse.json(res.data, { status: res.status });
    } catch {
        return NextResponse.json(
            { error: "Proxy error" },
            { status: 500 }
        );
    }
}