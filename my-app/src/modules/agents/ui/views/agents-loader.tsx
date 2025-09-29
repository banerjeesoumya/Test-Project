import { Loading } from "@/components/loader"

export const AgentsLoader = () => {
    return (
        <Loading title="Loading Agents" description="Please wait while we load your agents." />
    )
}

export const AgentLoader = () => {
    return (
        <Loading title="Loading Agent" description="Please wait while we load your agent." />
    )
}
