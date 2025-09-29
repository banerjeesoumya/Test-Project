
import { ResponsiveDialog } from "@/components/responsive-dialog"
import { AgentForm } from "./agent-form"
import { AgentGetOne } from "../../types"

interface NewAgentDialogProps {
    open: boolean,
    onOpenChange: (open: boolean) => void,
}

interface EditAgentDialogProps {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    initialValue: AgentGetOne
}

export const NewAgentDialog = ({ open, onOpenChange }: NewAgentDialogProps) => {
    return (
        <ResponsiveDialog title="New Agent" description="Create a new agent" open={open} onOpenChange={onOpenChange}>
            <AgentForm onSuccess={() => onOpenChange(false)} onCancel={() => onOpenChange(false)} /> 
        </ResponsiveDialog>
    )
}

export const EditAgentDialog = ({ open, onOpenChange, initialValue }: EditAgentDialogProps) => {
    return (
        <ResponsiveDialog title="Edit Agent" description="Edit the agent details" open={open} onOpenChange={onOpenChange}>
            <AgentForm onSuccess={() => onOpenChange(false)} onCancel={() => onOpenChange(false)} initialValue={initialValue} /> 
        </ResponsiveDialog>
    )
}