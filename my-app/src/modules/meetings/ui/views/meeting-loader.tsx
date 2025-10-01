import { Loading } from "@/components/loader"

export const MeetingsLoader = () => {
    return (
        <Loading title="Loading Meetings" description="Please wait while we load your meetings." />
    )
}

export const MeetingLoader = () => {
    return (
        <Loading title="Loading Meeting" description="Please wait while we load your meeting." />
    )
}
