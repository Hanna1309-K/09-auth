'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import css from './ModalNote.module.css';
import { fetchNoteById } from "@/lib/api/clientApi";
import { Note } from '@/types/note';

export default function NoteModalPage({
    params,
}: {
    params: { id: string };
}) {
    const router = useRouter();
    const { id } = params;

    const [note, setNote] = useState<Note | null>(null);

    useEffect(() => {
        if (!id) return;

        const load = async () => {
            try {
                const data = await fetchNoteById(id);
                setNote(data);
            } catch (error) {
                console.error(error);
            }
        };

        load();
    }, [id]);

    const handleClose = () => {
        router.back();
    };

    if (!note) {
        return <p>Loading...</p>;
    }

    return (
        <div className={css.backdrop} onClick={handleClose}>
            <div className={css.modal} onClick={(e) => e.stopPropagation()}>
                <h2 className={css.title}>{note.title}</h2>
                <p className={css.content}>{note.content}</p>

                <button className={css.closeButton} onClick={handleClose}>
                    Close
                </button>
            </div>
        </div>
    );
}