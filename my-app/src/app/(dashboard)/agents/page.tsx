import { auth } from "@/lib/auth";
import { loadSearchParams } from "@/modules/agents/params";
import { AgentsHeader } from "@/modules/agents/ui/components/header";
import { AgentsLoader } from "@/modules/agents/ui/views/agents-loader";
import { AgentsView } from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SearchParams } from "nuqs";
import { Suspense } from "react";

interface Props {
    searchParams: Promise<SearchParams>
}

const AgentsPage = async ({ searchParams} : Props) => {

    const resolvedSearchParams = await loadSearchParams(searchParams);

    const session = await auth.api.getSession({
        headers: await headers()
    });
    
    if (!session) {
        redirect("/sign-in");
    }

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({...resolvedSearchParams}));

    return (
        <>
            <AgentsHeader />
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<AgentsLoader />}>
                    <AgentsView />
                </Suspense>
            </HydrationBoundary>
        </>
    )
}

export default AgentsPage;