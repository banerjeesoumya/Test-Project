import { AgentsLoader } from "@/modules/agents/ui/views/agents-loader";
import { AgentsView } from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";

const AgentsPage = async () => {

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<AgentsLoader />}>
                <AgentsView />
            </Suspense>
        </HydrationBoundary>
    )
}

export default AgentsPage;