// lib/store/noteStore.ts
import { create } from "zustand";
import type { Tag } from "@/types/tag";

type Draft = {
    title: string;
    content: string;
    tag: Tag;
};

interface NoteStore {
    draft: Draft;
    setDraft: (draft: Draft) => void;
    clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>((set) => ({
    draft: {
        title: "",
        content: "",
        tag: "Work",
    },

    setDraft: (draft) => set({ draft }),

    clearDraft: () =>
        set({
            draft: {
                title: "",
                content: "",
                tag: "Work",
            },
        }),
}));