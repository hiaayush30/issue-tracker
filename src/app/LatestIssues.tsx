import { IssueStatusBadge } from '@/components';
import { prisma } from '@/lib/prisma'
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react'

async function LatestIssues() {
    const issues = await prisma.issue.findMany({
        orderBy: {
            createdAt: "desc"
        },
        take: 5,
        include: {
            assignedToUser: true
        }
    });
    return (
        <Card>
            <Heading mb={"5"} size={"8"}>Latest Issues</Heading>
            <Table.Root>
                <Table.Body>
                    {issues.map(issue => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Flex justify={"between"}>
                                    <Flex direction={"column"} align={"start"} gap={"2"}>
                                        <Link href={`/issues/${issue.id}`}>
                                            {issue.title}

                                        </Link>
                                        <IssueStatusBadge status={issue.status} />
                                    </Flex>
                                    {issue.assignedToUserId && (
                                        <Avatar radius='full' size={"2"} src={issue.assignedToUser?.image as string} fallback="?" />
                                    )}
                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Card>
    )
}

export default LatestIssues
