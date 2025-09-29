"use client"

import { Error } from "@/components/error"

const ErrorPage = () => {
    return (
        <Error title="Error Loading the Agent" description="There was an error loading your agent. Please try again later." />
    )
}

export default ErrorPage