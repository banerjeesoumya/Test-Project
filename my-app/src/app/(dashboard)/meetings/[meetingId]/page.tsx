import { auth } from "@/lib/auth";
import { MeetingIdView } from "@/modules/meetings/ui/views/meeting-id-views";
import { MeetingLoader } from "@/modules/meetings/ui/views/meeting-loader";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

interface MeetingPageProps {
    params: Promise<{
        meetingId: string;
    }>
}




const MeetingPage = async ({ params } : MeetingPageProps) => {

    const { meetingId } = await params;

    const session = await auth.api.getSession({
        headers: await headers(),
    })
    if (!session) {
        redirect('/sign-in')
    }

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
        trpc.meetings.getOne.queryOptions({ id: meetingId })
    )

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<MeetingLoader />}>
                <MeetingIdView meetingId={meetingId} />
            </Suspense>
        </HydrationBoundary>
    )
}

export default MeetingPage;