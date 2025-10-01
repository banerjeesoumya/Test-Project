import { Empty } from "@/components/empty-state"
import { Button } from "@/components/ui/button"
import { BanIcon, VideoIcon } from "lucide-react"
import Link from "next/link"

interface Props {
    meetingId: string;
    onCancelMeeting: () => void;
    isCancelling: boolean;  
}

export const UpcomingState = ({ meetingId, onCancelMeeting, isCancelling }: Props) => {
    return (
        <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
            <Empty title="Meeting not started yet" description="Once the meeting starts, you will be able to join, and the summary will be available afterwards." image="/upcoming.svg" />
            <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2">
                <Button variant="secondary" className="w-full lg:w-auto" onClick={() => onCancelMeeting()} disabled={isCancelling}>
                    <BanIcon />
                    Cancel Meeting
                </Button>
                <Button asChild className="w-full lg:w-auto" onClick={() => {}} disabled={isCancelling}>
                    <Link href={`/call/${meetingId}`}>
                        <VideoIcon />
                        Join Meeting
                    </Link>
                </Button>
            </div>
        </div>
    )
}