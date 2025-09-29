import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
// import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { AgentIdView } from "@/modules/agents/ui/views/agent-id-view";
import { AgentLoader } from "@/modules/agents/ui/views/agents-loader";

interface Props {
    params: Promise<{ agentId: string }>
};

const AgentPage = async ({ params } : Props) => {
    const { agentId } = await params;
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getOne.queryOptions({ id: agentId }));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<AgentLoader />}>
                <AgentIdView agentId={agentId} />
            </Suspense>
        </HydrationBoundary>
    )
};

export default AgentPage;