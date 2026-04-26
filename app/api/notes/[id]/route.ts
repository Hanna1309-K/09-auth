import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/api/api";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

export const dynamic = "force-dynamic";

const getCookieHeader = async () => {
    const cookieStore = await cookies();
    return cookieStore.toString();
};

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;

        const cookieHeader = await getCookieHeader();

        const res = await api.get(`/notes/${id}`, {
            headers: {
                Cookie: cookieHeader,
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

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;

        const cookieHeader = await getCookieHeader();

        const res = await api.delete(`/notes/${id}`, {
            headers: {
                Cookie: cookieHeader,
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

export async function PATCH(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const body = await request.json();

        const cookieHeader = await getCookieHeader();

        const res = await api.patch(`/notes/${id}`, body, {
            headers: {
                Cookie: cookieHeader,
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