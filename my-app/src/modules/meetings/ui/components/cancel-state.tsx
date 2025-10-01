import { Empty } from "@/components/empty-state"


export const CancelledState = () => {
    return (
        <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
            <Empty title="Meeting is currently cancelled" description="This meeting is cancelled. You can no longer join this meeting." image="/cancelled.svg" />
        </div>
    )
}