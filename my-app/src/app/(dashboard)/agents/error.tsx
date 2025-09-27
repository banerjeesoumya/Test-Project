"use client"

import { Error } from "@/components/error"

const ErrorPage = () => {
    return (
        <Error title="Error Loading Agents" description="There was an error loading your agents. Please try again later." />
    )
}

export default ErrorPage