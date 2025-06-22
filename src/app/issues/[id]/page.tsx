import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
    params:{
        id:string
    }
}

async function IssueDetailsPage({params}:Props) {
    const { id } = params;

    if(params.id !== "number") notFound(); //if users enter /issues/abc or sth
    const issue = await prisma.issue.findUnique({
        where: {
            id: Number(id)
        }
    })
    if (!issue) {
        notFound();
    }

    return (
        <div className="p-4">
            <p>{issue.title}</p>
            <p>{issue.description}</p>
            <p>{issue.status}</p>
            <p>{issue.createdAt.toDateString()}</p>
        </div>
    )
}

export default IssueDetailsPage
