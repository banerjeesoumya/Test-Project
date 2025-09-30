import { MeetingsLoader } from "@/modules/meetings/ui/views/meeting-loader";
import { MeetingsView } from "@/modules/meetings/ui/views/meetings-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

const MeetingsPage = () => {

    const querClient = getQueryClient();
    void querClient.prefetchQuery(
        trpc.meetings.getMany.queryOptions({})
    );

    return (
        <HydrationBoundary state={dehydrate(querClient)}>
            <Suspense fallback={<MeetingsLoader  />}>
                <MeetingsView />
            </Suspense>
        </HydrationBoundary>
    )
}

export default MeetingsPage;