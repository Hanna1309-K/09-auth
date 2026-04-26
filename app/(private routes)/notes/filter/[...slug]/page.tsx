import { fetchNotes } from "@/lib/api/serverApi";
import { Note } from "@/types/note";

type Props = {
    params: Promise<{ slug: string[] }>;
    searchParams: { page?: string; search?: string };
};

export default async function Page({ params, searchParams }: Props) {
    const { slug } = await params;

    const tag = slug?.[0] === "all" ? undefined : slug?.[0];

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