import { nextServer } from "./apiInstance";
import { User } from "@/types/user";
import { Note, CreateNoteDto } from "@/types/note";

// AUTH
export const login = async (data: {
    email: string;
    password: string;
}): Promise<User> => {
    const res = await nextServer.post<User>("/auth/login", data);
    return res.data;
};

export const register = async (data: {
    email: string;
    password: string;
}): Promise<User> => {
    const res = await nextServer.post("/auth/register", data);
    return res.data;
};

export const logout = async (): Promise<void> => {
    await nextServer.post("/auth/logout");
};

// NOTES
export const fetchNotes = async (params?: {
    search?: string;
    tag?: string;
}): Promise<Note[]> => {
    const res = await nextServer.get("/notes", { params });
    return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
    const res = await nextServer.get(`/notes/${id}`);
    return res.data;
};

export const createNote = async (data: CreateNoteDto): Promise<Note> => {
    const res = await nextServer.post("/notes", data);
    return res.data;
};

export const deleteNote = async (id: string): Promise<void> => {
    await nextServer.delete(`/notes/${id}`);
};

// USER
export const getMe = async (): Promise<User> => {
    const res = await nextServer.get("/users/me");
    return res.data;
};

export const updateMe = async (data: { username: string }) => {
    const res = await nextServer.patch("/users/me", data);
    return res.data;
};