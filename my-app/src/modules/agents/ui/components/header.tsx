"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon, XCircleIcon } from "lucide-react"
import { NewAgentDialog } from "./agent-dialog"
import { useState } from "react"
import { useFilter } from "../../hooks/use-filter"
import { AgentSearchFilter } from "./agent-search-filter"
import { DEFAULT_PAGE } from "@/constants"

export const Header = () => {
    return (
        <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
                <h5 className="font-medium text-xl">My Agents</h5>
                <Button>
                    <PlusIcon />
                    Create Agent
                </Button>
            </div>
        </div>
    )
}

export const AgentsHeader = () => {

    const [open, setOpen] = useState(false);
    const [filters, setFilters] = useFilter();

    const filtersModified = !!filters.search;

    const onClearFilters = () => {
        setFilters({
            search: "",
            page: DEFAULT_PAGE
        })
    }

    return (
        <>
            <NewAgentDialog open={open} onOpenChange={setOpen} />
            <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
                <div className="flex items-center justify-between">
                    <h5 className="font-medium text-xl">My Agents</h5>
                    <Button onClick={() => setOpen(true)}>
                        <PlusIcon />
                        Create Agent
                    </Button>
                </div>
                <div className="flex items-center gap-x-2 p-1">
                    <AgentSearchFilter />
                    {filtersModified && (
                        <Button variant="outline" size="sm" onClick={onClearFilters}>
                            <XCircleIcon />
                            Clear Filters
                        </Button>
                    )}
                </div>
            </div>
        </>
    )
}