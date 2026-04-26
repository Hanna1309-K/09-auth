import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/lib/api/api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const cookieStore = await cookies();
        const { id } = params;

        const res = await api.get(`/notes/${id}`, {
            headers: {
                Cookie: cookieStore.toString(),
            },
        });

        return NextResponse.json(res.data, { status: res.status });
    } catch (error) {
        if (isAxiosError(error)) {
            return NextResponse.json(
                {
                    error: error.message,
                    response: error.response?.data,
                },
                {
                    status: error.status,
                }
            );
        }

        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const cookieStore = await cookies();
        const { id } = params;

        const res = await api.delete(`/notes/${id}`, {
            headers: {
                Cookie: cookieStore.toString(),
            },
        });

        return NextResponse.json(res.data, { status: res.status });
    } catch (error) {
        if (isAxiosError(error)) {
            return NextResponse.json(
                {
                    error: error.message,
                    response: error.response?.data,
                },
                {
                    status: error.status,
                }
            );
        }

        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const cookieStore = await cookies();
        const { id } = params;
        const body = await request.json();

        const res = await api.patch(`/notes/${id}`, body, {
            headers: {
                Cookie: cookieStore.toString(),
                'Content-Type': 'application/json',
            },
        });

        return NextResponse.json(res.data, { status: res.status });
    } catch (error) {
        if (isAxiosError(error)) {
            return NextResponse.json(
                {
                    error: error.message,
                    response: error.response?.data,
                },
                {
                    status: error.status,
                }
            );
        }

        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}