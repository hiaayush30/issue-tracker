import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

interface Props {
    status: Status
}

//we defined it outside the component as this logic if fixed and does not have to change across renders
const statusMap: Record<Status, { label: string, color: "red" | "violet" | "green" }> = {
    OPEN: { label: "Open", color: "red" },
    IN_PROGRESS: { label: "In Progress", color: "violet" },
    CLOSED: { label: "Closed", color: "green" }
}

function IssueStatusBadge({ status }: Props) {
    return (
        <Badge color={statusMap[status].color}>
            {statusMap[status].label}
        </Badge>
    )
}

export default IssueStatusBadge
