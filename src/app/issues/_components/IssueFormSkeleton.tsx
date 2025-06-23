import { Box } from '@radix-ui/themes'
import React from 'react'
import { Skeleton } from "@/components"

function IssueFormSkeleton() {
    return (
        <Box className="max-w-xl p-4">
            <Skeleton height={"2rem"} />
            <Skeleton height={"20rem"} />
        </Box>
    )
}

export default IssueFormSkeleton
