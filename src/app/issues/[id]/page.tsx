import { prisma } from "@/lib/prisma";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssue from "./EditIssue";
import IssueDetails from "./IssueDetails";

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
                <IssueDetails issue={issue} />
            </Box>
            <Box>
                <EditIssue issueId={issue.id} />
            </Box>
        </Grid>
    )
}

export default IssueDetailsPage
