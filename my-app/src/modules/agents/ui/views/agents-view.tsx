"use client"

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../../../../components/data-table";
import { columns } from "../components/columns";
import { Empty } from "@/components/empty-state";
import { useAgentsFilter } from "@/hooks/use-filter";
import { DataPagination } from "../../../../components/pagination";
import { useRouter } from "next/navigation";


export const AgentsView = () => {

    const router = useRouter();
    const [filters, setFilters] = useAgentsFilter();
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({...filters}));

    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
            <DataTable data={data.items} columns={columns} onRowClick={(row) => router.push(`/agents/${row.id}`)} />
            <DataPagination page={filters.page} totalPages={data.totalPages} onPageChange={page => setFilters({ page })} />
            {data.items.length === 0 && (
               <Empty 
                    title= "Create your first agent"
                    description= "An agent is a virtual assistant that can help you with various tasks. Create one to get started."
               /> 
            )}
        </div>
    )
};