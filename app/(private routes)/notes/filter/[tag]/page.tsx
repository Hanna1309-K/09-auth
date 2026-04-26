import { fetchNotes } from "@/lib/api/serverApi";
import { Note } from "@/types/note";
import { FilterTag } from "@/types/tag";

export default async function NotesPage({
    params,
    searchParams,
}: {
    params: { tag: FilterTag };
    searchParams: { page?: string; search?: string };
}) {
    const tag = params.tag === "all" ? undefined : params.tag;

    const notes: Note[] = await fetchNotes({
        search: searchParams.search ?? "",
        tag,
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