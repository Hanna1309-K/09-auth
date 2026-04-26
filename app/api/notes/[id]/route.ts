import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/api/api";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const cookieStore = cookies();

        const cookieHeader = cookieStore.toString();

        const res = await api.get(`/notes/${params.id}`, {
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

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const cookieStore = cookies();

        const cookieHeader = cookieStore.toString();

        const res = await api.delete(`/notes/${params.id}`, {
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

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();

        const cookieStore = cookies();

        const cookieHeader = cookieStore.toString();

        const res = await api.patch(`/notes/${params.id}`, body, {
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

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}