"use client"

import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { MeetingIdViewer } from "../components/meeting-id-viewer";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EditMeetingDialog } from "../components/meeting-dialog";
import { useState } from "react";
import { UpcomingState } from "../components/upcoming-state";
import { ProcessingState } from "../components/processing-state";
import { ActiveState } from "../components/active-state";
import { CancelledState } from "../components/cancel-state";

interface Props {
    meetingId: string;
}

export const MeetingIdView = ({ meetingId } : Props) => {

    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const router = useRouter()

    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

    const { data } = useSuspenseQuery(
        trpc.meetings.getOne.queryOptions({ id: meetingId })
    );

    const removedAgent = useMutation(
        trpc.agents.remove.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}))
                router.push("/meetings")
            },
            onError: (error) => {
                toast.error(error.message)
            }
        }),
    )

    const isActive = data.status === "active";
    const isUpcoming = data.status === "upcoming";
    const isCancelled = data.status === "cancelled";
    const isCompleted = data.status === "completed";
    const isProcessing = data.status === "processing";
    

    return (
        <>
        <EditMeetingDialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen} initialValue={data} />
            <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
                <MeetingIdViewer 
                    meetingId={meetingId}
                    meetingName={data?.name}
                    onEdit={() => setUpdateDialogOpen(true)}
                    onRemove={() => removedAgent.mutate({ id: meetingId })}
                />
                { isCancelled && (
                    <CancelledState />
                )}
                { isCompleted && (
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md text-center font-medium">
                        This meeting has been completed.
                    </div>
                )}
                { isActive && (
                    <ActiveState meetingId={meetingId} />
                )}
                { isUpcoming && (
                    <UpcomingState meetingId={meetingId} onCancelMeeting={() => {}} isCancelling={false} />
                )}
                { isProcessing && (
                    <ProcessingState />
                )}
            </div>
        </>
    )
}