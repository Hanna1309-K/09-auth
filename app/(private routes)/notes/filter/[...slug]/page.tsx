import { cookies } from "next/headers";
import { fetchNotes } from "@/lib/api/serverApi";
import { Note } from "@/types/note";

export default async function Page({
    params,
    searchParams,
}: {
    params: { tag: string };
    searchParams: { page?: string; search?: string };
}) {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");

    const notes: Note[] = await fetchNotes(
        {
            page: Number(searchParams.page) || 1,
            search: searchParams.search || "",
            tag: params.tag === "all" ? undefined : params.tag,
        },
        cookieHeader
    );

    return (
        <ul>
            {notes.map((note) => (
                <li key={note.id}>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                </li>
            ))}
        </ul>
    );
}