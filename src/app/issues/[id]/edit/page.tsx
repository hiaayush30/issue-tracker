import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import IssueForm from "../../_components/IssueForm";


interface Props {
    params: Promise<{ id: string }>
}

async function EditIssuePage({ params }: Props) {
    const { id } = await params;

    const parsedId = Number(id);
    if (isNaN(parsedId)) notFound();
    const issue = await prisma.issue.findUnique({
        where: {
            id: parsedId
        }
    });
    if (!issue) notFound();
    return (
        <IssueForm issue={issue} />
    )
}

export default EditIssuePage
