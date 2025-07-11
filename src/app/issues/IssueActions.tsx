import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueStatusFilter from './IssueStatusFilter'

function IssueActions() {
    return (
        <Flex className="mb-5" direction={"row"} gap={"5"}>
            <IssueStatusFilter/>
            <Button>
                <Link href={"/issues/new"}>
                    New Issue
                </Link>
            </Button>
        </Flex>
    )
}

export default IssueActions
