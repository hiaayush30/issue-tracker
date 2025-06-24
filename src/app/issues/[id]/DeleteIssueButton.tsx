"use client"
import { Spinner } from "@/components";
import { AlertDialog, Button, Flex } from "@radix-ui/themes"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { AiOutlineDelete } from "react-icons/ai"
import { toast } from "react-toastify";

function DeleteIssue({ issueId }: { issueId: number }) {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const handleDelete = async () => {
        try {
            setSubmitting(true);
            await axios.delete("/issues/" + issueId);
            toast.info("issue deleted");
            router.push("/issues");
        } catch (error) {
            console.log(error);
            toast.error("Could not delete issue");
        }
    }
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button
                    disabled={submitting}
                    color="red">
                    {submitting ? <>Deleting <Spinner /></> : <><AiOutlineDelete /> Delete Issue</>}
                </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>Delete Confirmation</AlertDialog.Title>
                <AlertDialog.Description>Are you sure you want to delete this issue? This action cannot be undone.</AlertDialog.Description>
                <Flex direction={"row"} mt={"4"} gap={"4"}>
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">Cancel</Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button
                            onClick={handleDelete}
                            color="red"
                        > Delete </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}

export default DeleteIssue
