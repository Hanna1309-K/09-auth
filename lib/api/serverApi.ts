
import { Note } from "@/types/note";
import { User } from "@/types/user";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";
// ======================
// 📌 NOTES (SERVER)
// ======================

export const fetchNotes = async (
    params?: {
        page?: number;
        search?: string;
        tag?: string;
    },
    cookieHeader?: string
): Promise<Note[]> => {
    const res = await axios.get<Note[]>(`${baseURL}/notes`, {
        params,
        headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
    });

    return res.data;
};

export const fetchNoteById = async (
    id: string,
    cookieHeader?: string
): Promise<Note> => {
    const res = await axios.get<Note>(`${baseURL}/notes/${id}`, {
        headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
    });

    return res.data;
};

// ======================
// 👤 USER (SERVER)
// ======================

export const getMe = async (
    cookieHeader?: string
): Promise<User> => {
    const res = await axios.get<User>(`${baseURL}/users/me`, {
        headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
    });

    return res.data;
};

// ======================
// 🔐 AUTH (SERVER)
// ======================

export const checkSession = async (
    cookieHeader?: string
): Promise<User | null> => {
    const res = await axios.get(`${baseURL}/auth/session`, {
        headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
    });

    return res.data;
};