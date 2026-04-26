import {
    QueryClient,
    dehydrate,
    HydrationBoundary,
} from "@tanstack/react-query";

import { fetchNoteById } from "@/lib/api/serverApi";
import NotePreview from "./NotePreview.client";

type Props = {
    params: { id: string };
};

export default async function Page({ params }: Props) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["note", params.id],
        queryFn: () => fetchNoteById(params.id),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotePreview id={params.id} />
        </HydrationBoundary>
    );
}