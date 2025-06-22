import IssueStatusBadge from "@/components/IssueStatusBadge";
import { prisma } from "@/lib/prisma";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";

interface Props {
    params: {
        id: string
    }
}

async function IssueDetailsPage({ params }: Props) {
    const { id } = await params;
    const parsedId = Number(id);

    if (typeof parsedId !== "number") notFound(); //if users enter /issues/abc or sth
    const issue = await prisma.issue.findUnique({
        where: {
            id: parsedId
        }
    })

    if (!issue) {
        notFound();
    }

    return (
        <div className="p-4 space-y-4">
            <Heading>{issue.title}</Heading>
            <div className="flex items-center gap-4 my-1">
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </div>
            <Card>
                {issue.description}
            </Card>
        </div>
    )
}

export default IssueDetailsPage
