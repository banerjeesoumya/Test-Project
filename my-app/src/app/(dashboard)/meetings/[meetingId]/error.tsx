"use client"

import { Error } from "@/components/error"

const ErrorPage = () => {
    return (
        <Error title="Error Loading Meeting" description="There was an error loading your meeting. Please try again later." />
    )
}

export default ErrorPage