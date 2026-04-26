import type { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNotePage.module.css";

export const metadata: Metadata = {
    title: "Create note | NoteHub",
    description: "Create a new note in NoteHub application.",
    openGraph: {
        title: "Create note | NoteHub",
        description: "Create a new note in NoteHub application.",
        url: "https://YOUR-VERCEL-DOMAIN/notes/action/create",
        images: [
            {
                url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            },
        ],
    },
};

export default function Page() {
    return (
        <main className={css.mainContent}>
            <h1>Create note</h1>
            <NoteForm />
        </main>
    );
}