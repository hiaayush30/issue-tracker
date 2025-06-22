import { IssueStatusBadge } from "@/components"
import { Issue } from "@prisma/client";
import { Card, Heading, Text } from "@radix-ui/themes"
import ReactMarkdown from "react-markdown";

function IssueDetails({issue}:{issue:Issue}) {
    return (
        <>
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
        </>
    )
}

export default IssueDetails
