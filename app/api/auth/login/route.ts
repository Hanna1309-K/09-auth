import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/api/api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const apiRes = await api.post("/auth/login", body);

        const response = NextResponse.json(apiRes.data, {
            status: apiRes.status,
        });

        const setCookie = apiRes.headers["set-cookie"];

        if (setCookie) {
            const cookiesArray = Array.isArray(setCookie)
                ? setCookie
                : [setCookie];

            cookiesArray.forEach((cookie) => {
                response.headers.append("set-cookie", cookie);
            });
        }

        return response;
    } catch (error) {
        if (isAxiosError(error)) {
            logErrorResponse(error.response?.data);

            return NextResponse.json(
                { error: error.message },
                { status: error.response?.status || 500 }
            );
        }

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}