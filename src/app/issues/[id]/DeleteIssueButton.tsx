import { Button } from "@radix-ui/themes"
import { AiOutlineDelete } from "react-icons/ai"

function DeleteIssue({ issueId }: { issueId: number }) {
    return (
        <Button color="red">
            <AiOutlineDelete />
            Delete Issue
        </Button>
    )
}

export default DeleteIssue
