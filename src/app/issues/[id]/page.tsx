import { prisma } from "@/lib/prisma";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssue from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssue from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import AssignIssue from "./AssignIssue";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

interface Props {
    params: Promise<{ id: string }>
}

async function IssueDetailsPage({ params }: Props) {
    const session = await getServerSession(authOptions);
    const { id } = await params;

    const parsedId = Number(id);
    if (isNaN(parsedId)) notFound(); //if users enter /issues/abc or sth
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
        <Grid className="p-4 space-y-4" columns={{ initial: "1", md: "5" }} gap={"4"}>
            <Box className="lg:col-span-3">
                <IssueDetails issue={issue} />
            </Box>
            {
                session?.user &&
                <>
                    <Flex className="lg:col-span-1" direction={"column"} gap={"4"} mx={{ initial: "auto", md: "0" }}>
                        <AssignIssue issue={issue} />
                        <EditIssue issueId={issue.id} />
                        <DeleteIssue issueId={issue.id} />
                    </Flex>
                </>
            }
        </Grid>
    )
}

export default IssueDetailsPage
