"use client";

import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { fetchNotes } from "@/lib/api/clientApi";
import css from "./NotesPage.module.css";

import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";

type Props = {
    tag?: string;
};

export default function NotesClient({ tag }: Props) {
    const router = useRouter();

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    const handleSearch = (value: string) => {
        setSearch(value);
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ["notes", debouncedSearch, tag],
        queryFn: () =>
            fetchNotes({
                search: debouncedSearch,
                tag: tag && tag !== "all" ? tag : undefined,
            }),
        placeholderData: keepPreviousData,
    });

    return (
        <div className={css.app}>
            <div className={css.toolbar}>
                <SearchBox value={search} onChange={handleSearch} />

                <button
                    type="button"
                    className={css.button}
                    onClick={() => router.push("/notes/action/create")}
                >
                    Create note
                </button>
            </div>

            {isLoading && <p>Loading...</p>}
            {error && <p>Error loading notes</p>}

            {data && <NoteList notes={data} />}
        </div>
    );
}