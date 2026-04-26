import { api } from "./api";
import { cookies } from "next/headers";
import { User } from "@/types/user";
import { Note } from "@/types/note";

const getCookieHeader = () => {
    const cookieStore = cookies();

    return cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
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
    const res = await api.get("/notes", {
        params: {
            ...params,
            perPage: 12,
        },
        headers: {
            Cookie: getCookieHeader(),
        },
    });

    return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
    const res = await api.get(`/notes/${id}`, {
        headers: {
            Cookie: getCookieHeader(),
        },
    });

    return res.data;
};

/**
 * USER
 */

export const getMe = async (): Promise<User> => {
    const res = await api.get("/users/me", {
        headers: {
            Cookie: getCookieHeader(),
        },
    });

    return res.data;
};

export const checkSession = async (): Promise<User | null> => {
    const res = await api.get("/auth/session", {
        headers: {
            Cookie: getCookieHeader(),
        },
    });

    return res.data?.user ?? null;
};