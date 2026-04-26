import { api } from "./api";
import { User } from "@/types/user";
import { Note, CreateNoteDto } from "@/types/note";

// AUTH
export const login = async (data: {
    email: string;
    password: string;
}): Promise<User> => {
    const res = await api.post("/auth/login", data);
    return res.data;
};

export const register = async (data: {
    email: string;
    password: string;
}): Promise<User> => {
    const res = await api.post("/auth/register", data);
    return res.data;
};

export const logout = async (): Promise<void> => {
    await api.post("/auth/logout");
};

// NOTES
export const fetchNotes = async (params?: {
    search?: string;
    tag?: string;
    page?: number;
}): Promise<Note[]> => {
    const res = await api.get("/notes", {
        params: {
            ...params,
            perPage: 12,
        },
    });

    return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
    const res = await api.get(`/notes/${id}`);
    return res.data;
};

export const createNote = async (data: CreateNoteDto): Promise<Note> => {
    const res = await api.post("/notes", data);
    return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
    const res = await api.delete(`/notes/${id}`);
    return res.data;
};

// USER
export const getMe = async (): Promise<User> => {
    const res = await api.get("/users/me");
    return res.data;
};

export const updateMe = async (data: { username: string }) => {
    const res = await api.patch("/users/me", data);
    return res.data;
};

export const checkSession = async (): Promise<User | null> => {
    const res = await api.get("/auth/session");
    return res.data?.user ?? null;
};