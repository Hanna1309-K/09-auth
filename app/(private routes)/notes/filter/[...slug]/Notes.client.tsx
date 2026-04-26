"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api/clientApi";
import css from "./NotesPage.module.css";

import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";

type Props = {
    tag?: string;
};

export default function NotesClient({ tag }: Props) {
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [page, setPage] = useState(1);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    const handleSearch = (value: string) => {
        setSearch(value);
    };

    const handleNextPage = () => setPage((p) => p + 1);
    const handlePrevPage = () => setPage((p) => Math.max(1, p - 1));

    const { data, isLoading, error } = useQuery({
        queryKey: ["notes", debouncedSearch, tag, page],
        queryFn: () =>
            fetchNotes({
                search: debouncedSearch,
                tag: tag && tag !== "all" ? tag : undefined,
                page,
            }),
        placeholderData: keepPreviousData,
    });

    return (
        <div className={css.app}>
            <div className={css.toolbar}>
                <SearchBox value={search} onChange={handleSearch} />

                <Link href="/notes/action/create" className={css.button}>
                    Create note
                </Link>
            </div>

            {isLoading && <p>Loading...</p>}
            {error && <p>Error loading notes</p>}

            {data && <NoteList notes={data} />}

            <div className={css.pagination}>
                <button onClick={handlePrevPage} disabled={page === 1}>
                    Prev
                </button>

                <span>Page {page}</span>

                <button onClick={handleNextPage}>Next</button>
            </div>
        </div>
    );
}