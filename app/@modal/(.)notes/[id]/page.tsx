import {
    QueryClient,
    dehydrate,
    HydrationBoundary,
} from "@tanstack/react-query";

import { fetchNoteById } from "@/lib/api/clientApi";
import NotePreview from "./NotePreview.client";

type Props = {
    params: { id: string };
};

export default async function Page({ params }: Props) {
    const { id } = params;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotePreview id={id} />
        </HydrationBoundary>
    );
}