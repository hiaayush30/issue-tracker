import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation';

interface Props {
    params: {
        id: string
    }
}

async function page({ params }: Props) {
    const { id } = await params;

    const parsedId = Number(id);
    if (typeof parsedId !== "number") notFound();
    const issue = await prisma.issue.findUnique({
        where: {
            id: parsedId
        }
    })
    return (
        <div>
            {JSON.stringify(issue)}
        </div>
    )
}

export default page
