"use client";

import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { AgentIdViewer } from "../components/agent-id-viewer";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { EditAgentDialog } from "../components/agent-dialog";

interface Props {
    agentId: string
}

export const AgentIdView = ({
    agentId
}: Props) => {
    const trpc = useTRPC();
    const router = useRouter();
    const queryClient = useQueryClient();

    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

    const { data } = useSuspenseQuery(trpc.agents.getOne.queryOptions({ id: agentId }));

    const removedAgent = useMutation(
        trpc.agents.remove.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}))
                router.push("/agents")
            },
            onError: (error) => {
                toast.error(error.message)
            }
        }),
    )

    return (
        <>
            <EditAgentDialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen} initialValue={data} />
                <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
                    <AgentIdViewer
                        agentId={agentId}
                        agentName={data.name}
                        onEdit={() => setUpdateDialogOpen(true)}
                        onRemove={() => removedAgent.mutate({ id: agentId })}
                    />
                    <div className="bg-white rounded-lg border">
                        <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
                            <div className="flex items-center gap-x-3">
                                <GeneratedAvatar variant="botttsNeutral" seed={data.name} className="size-10" />
                                <h2 className="font-medium text-2xl">{data.name}</h2>
                            </div>
                            <Badge variant="outline" className="flex items-center gap-x-2 [&>svg]:size-4">
                                <VideoIcon className="text-blue-700" />
                                {data.meetingCount} {data.meetingCount === 1 ? "Meeting" : "Meetings"}
                            </Badge>
                            <div className="flex flex-col gap-y-4">
                                <p className="text-lg font-medium">Instructions</p>
                                <p className="text-sm text-muted-foreground">{data.instructions}</p>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}