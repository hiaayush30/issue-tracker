import IssueStatusBadge from "@/components/IssueStatusBadge";
import { prisma } from "@/lib/prisma";
import { Box, Button, Card, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons"
import Link from "next/link";

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
        // breakpoints in radix components
        <Grid className="p-4 space-y-4" columns={{ initial: "1", md: "2" }} gap={"4"}>
            <Box>
                <Heading>{issue.title}</Heading>
                <div className="flex items-center gap-4 my-1">
                    <IssueStatusBadge status={issue.status} />
                    <Text>{issue.createdAt.toDateString()}</Text>
                </div>
                <Card mt={"4"} className="prose">
                    <ReactMarkdown>
                        {issue.description}
                    </ReactMarkdown>
                </Card>
            </Box>
            <Box>
                <Button>
                    <Pencil2Icon />
                    <Link href={`/issues/${issue.id}/edit`}>
                        Edit Issue
                    </Link>
                </Button>
            </Box>
        </Grid>
    )
}

export default IssueDetailsPage
