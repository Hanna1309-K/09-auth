"use client";

import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api/clientApi";
import { Note } from "@/types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
    notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (id: string) => deleteNote(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
    });

    return (
        <ul className={css.list}>
            {notes.map((note) => (
                <li key={note.id} className={css.listItem}>
                    <Link href={`/notes/${note.id}`} className={css.link}>
                        <h3 className={css.title}>{note.title}</h3>
                    </Link>

                    <p className={css.content}>{note.content}</p>

                    <div className={css.footer}>
                        <span className={css.tag}>{note.tag}</span>

                        <button
                            type="button"
                            onClick={() => mutate(note.id)}
                            disabled={isPending}
                            className={css.button}
                        >
                            {isPending ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}