"use client"

import { Error } from "@/components/error"

const ErrorPage = () => {
    return (
        <Error title="Error Loading Meetings" description="There was an error loading your meetings. Please try again later." />
    )
}

export default ErrorPage