export type Tag =
    | "Work"
    | "Personal"
    | "Todo"
    | "Meeting"
    | "Shopping";

export interface Note {
    id: string;
    title: string;
    content: string;
    tag: Tag;
    createdAt: string;
    updatedAt?: string;
}

export interface CreateNoteDto {
    title: string;
    content: string;
    tag: Tag;
}