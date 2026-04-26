import { fetchNotes } from "@/lib/api/serverApi";
import { Note } from "@/types/note";

export default async function Page({
    params,
    searchParams,
}: {
    params: { tag: string };
    searchParams: { page?: string; search?: string };
}) {
    const notes: Note[] = await fetchNotes({
        search: searchParams.search ?? "",
        tag: params.tag === "all" ? undefined : params.tag,
    });

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