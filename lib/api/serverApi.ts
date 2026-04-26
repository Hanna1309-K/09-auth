import { api } from "./api";
import { cookies } from "next/headers";
import { User } from "@/types/user";
import { Note } from "@/types/note";

const getCookieHeader = async () => {
    const cookieStore = await cookies();

    return cookieStore
        .getAll()
        .map((c: { name: string; value: string }) =>
            `${c.name}=${c.value}`
        )
        .join("; ");
};

/**
 * NOTES
 */

export const fetchNotes = async (params: {
    page?: number;
    search?: string;
    tag?: string;
}): Promise<Note[]> => {
    const cookieHeader = await getCookieHeader();

    const res = await api.get("/notes", {
        params: {
            ...params,
            perPage: 12,
        },
        headers: {
            Cookie: cookieHeader,
        },
    });

    return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
    const cookieHeader = await getCookieHeader();

    const res = await api.get(`/notes/${id}`, {
        headers: {
            Cookie: cookieHeader,
        },
    });

    return res.data;
};

/**
 * USER
 */

export const getMe = async (): Promise<User> => {
    const cookieHeader = await getCookieHeader();

    const res = await api.get("/users/me", {
        headers: {
            Cookie: cookieHeader,
        },
    });

    return res.data;
};

export const checkSession = async (): Promise<User | null> => {
    const cookieHeader = await getCookieHeader();

    const res = await api.get("/auth/session", {
        headers: {
            Cookie: cookieHeader,
        },
    });

    return res.data?.user ?? null;
};