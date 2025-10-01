import { MeetingsHeader } from "@/components/header";
import { auth } from "@/lib/auth";
import { loadSearchParams } from "@/modules/meetings/params";
import { MeetingsLoader } from "@/modules/meetings/ui/views/meeting-loader";
import { MeetingsView } from "@/modules/meetings/ui/views/meetings-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";


interface MeetingsPageProps {
    searchParams: Promise<SearchParams>
}

const MeetingsPage =  async ({ searchParams }: MeetingsPageProps) => {

    const paramsFilter = await loadSearchParams(searchParams);

     const session = await auth.api.getSession({
            headers: await headers()
        });
        
    if (!session) {
        redirect("/sign-in");
    }

    const querClient = getQueryClient();
    void querClient.prefetchQuery(
        trpc.meetings.getMany.queryOptions({
            ...paramsFilter
        })
    );

    return (
        <>
            <MeetingsHeader />
            <HydrationBoundary state={dehydrate(querClient)}>
                <Suspense fallback={<MeetingsLoader  />}>
                    <MeetingsView />
                </Suspense>
            </HydrationBoundary>
        </>
    )
}

export default MeetingsPage;