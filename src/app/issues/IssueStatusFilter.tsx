"use client"
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const statuses: { label: string, value: Status | "all" }[] = [
    { label: "All", value: "all" },
    { label: "Open", value: 'OPEN' },
    { label: "Closed", value: 'CLOSED' },
    { label: "In Progress", value: 'IN_PROGRESS' },
]

function IssueStatusFilter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    return (
        <Select.Root
            defaultValue={searchParams.get("status") ? searchParams.get("status")! : "all"}
            onValueChange={(status) => {
                const params = new URLSearchParams();
                if (status) params.append('status', status)
                if (searchParams.get('orderBy')) params.append('orderBy', searchParams.get('orderBy')!)
                const query = params.size ? "?" + params.toString() : null
                if (query) {
                    router.push("/issues" + query);
                } else {
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
