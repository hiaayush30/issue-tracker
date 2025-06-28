"use client"
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

const statuses: { label: string, value: Status | "all" }[] = [
    { label: "All", value: "all" },
    { label: "Open", value: 'OPEN' },
    { label: "Closed", value: 'CLOSED' },
    { label: "In Progress", value: 'IN_PROGRESS' },
]

function IssueStatusFilter() {
    const router = useRouter();
    return (
        <Select.Root
            onValueChange={(status) => {
                const query = status != "all" ? "?status=" + status : null
                if(query){
                    router.push("/issues" + query);
                }else {
                    router.push("/issues")
                }
            }}
        >
            <Select.Trigger placeholder='Filter by status...' />
            <Select.Content>
                {statuses.map(status => (
                    <Select.Item
                        key={status.label}
                        value={status.value}>
                        {status.label}
                    </Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    )
}

export default IssueStatusFilter
