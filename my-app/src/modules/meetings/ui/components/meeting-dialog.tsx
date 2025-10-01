
import { ResponsiveDialog } from "@/components/responsive-dialog"
import { MeetingForm } from "./meeting-form"
import { useRouter } from "next/navigation"
import { MeetingGetOne } from "../../types"


interface NewMeetingDialogProps {
    open: boolean,
    onOpenChange: (open: boolean) => void,
}

interface EditMeetingDialogProps {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    initialValue: MeetingGetOne
}



export const NewMeetingDialog = ({ open, onOpenChange }: NewMeetingDialogProps) => {
    const router = useRouter();
    return (
        <ResponsiveDialog title="New Meeting" description="Create a new meeting" open={open} onOpenChange={onOpenChange}>
            <MeetingForm 
                onSuccess={(id) => {
                    onOpenChange(false);
                    router.push(`/meetings/${id}`);
                }}
                onCancel={() => onOpenChange(false)}
            />
        </ResponsiveDialog>
    )
}

export const EditMeetingDialog = ({ open, onOpenChange, initialValue }: EditMeetingDialogProps) => {
    return (
        <ResponsiveDialog title="Edit Meeting" description="Edit the meeting details" open={open} onOpenChange={onOpenChange}>
            <MeetingForm onSuccess={() => onOpenChange(false)} onCancel={() => onOpenChange(false)} initialValue={initialValue} /> 
        </ResponsiveDialog>
    )
}