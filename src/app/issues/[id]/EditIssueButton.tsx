import { Pencil2Icon } from "@radix-ui/react-icons"
import { Button } from "@radix-ui/themes"
import Link from "next/link"

function EditIssue({issueId}:{issueId:number}) {
    return (
        <Button>
            <Pencil2Icon />
            <Link href={`/issues/${issueId}/edit`}>
                Edit Issue
            </Link>
        </Button>
    )
}

export default EditIssue
