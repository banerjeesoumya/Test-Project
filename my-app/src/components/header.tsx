"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon, XCircleIcon } from "lucide-react"
import { NewAgentDialog } from "../modules/agents/ui/components/agent-dialog"
import { useState } from "react"
import { useAgentsFilter, useMeetingsFilter } from "@/hooks/use-filter"
import { AgentSearchFilter } from "../modules/agents/ui/components/agent-search-filter"
import { DEFAULT_PAGE } from "@/constants"
import { NewMeetingDialog } from "@/modules/meetings/ui/components/meeting-dialog"
import { MeetingSearchFilter } from "@/modules/meetings/ui/components/meeting-search-filter"
import { StatusFilter } from "@/modules/meetings/ui/components/status-filter"
import { ScrollArea, ScrollBar } from "./ui/scroll-area"

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
    const [filters, setFilters] = useAgentsFilter();

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
                <ScrollArea>
                    <div className="flex items-center gap-x-2 p-1">
                        <AgentSearchFilter />
                        {filtersModified && (
                            <Button variant="outline" size="sm" onClick={onClearFilters}>
                                <XCircleIcon />
                                Clear Filters
                            </Button>
                        )}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </>
    )
}

export const MeetingsHeader = () => {

    const [open, setOpen] = useState(false);
    const [filters, setFilters] = useMeetingsFilter();

    const filtersModified = !!filters.search || !!filters.status || !!filters.agentId;

    const onClearFilters = () => {
        setFilters({
            status: null,
            agentId: "",
            search: "",
            page: DEFAULT_PAGE
        })
    }

    return (
        <>
            <NewMeetingDialog open={open} onOpenChange={setOpen} />
            <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
                <div className="flex items-center justify-between">
                    <h5 className="font-medium text-xl">My Meetings</h5>
                    <Button onClick={() => setOpen(true)}>
                        <PlusIcon />
                        Create Meeting
                    </Button>
                </div>
                <ScrollArea>
                    <div className="flex items-center gap-x-2 p-1">
                        <MeetingSearchFilter />
                        <StatusFilter />
                        {filtersModified && (
                            <Button variant="outline" size="sm" onClick={onClearFilters}>
                                <XCircleIcon />
                                Clear Filters
                            </Button>
                        )}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </>
    )
}