"use client";

import { DataTable } from "@/components/data-table";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { Empty } from "@/components/empty-state";
import { useRouter } from "next/navigation";
import { useMeetingsFilter } from "@/hooks/use-filter";
import { DataPagination } from "@/components/pagination";

export const MeetingsView = () => {
    const trpc = useTRPC();
    const router = useRouter();
    const [filters, setFilters] = useMeetingsFilter();

    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({
        ...filters
    }))

    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
            <DataTable data={data.items} columns={columns}  onRowClick={(row) => router.push(`/meetings/${row.id}`)} />
            <DataPagination page={filters.page} totalPages={data.totalPages} onPageChange={(page) => setFilters({ page })} />
            {data.items.length === 0 && (
                <Empty 
                    title= "Create your first meeting"
                    description= "A meeting is a scheduled event that can help you organize your tasks. Create one to get started."
                />
            )}
        </div>
    )
}