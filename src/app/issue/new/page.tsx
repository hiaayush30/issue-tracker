"use client"
import React from "react"
import { Button, TextField } from "@radix-ui/themes"
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface IssueForm {
    title: string;
    description: string
}

function NewIssue() {
    const router = useRouter();
    const formSubmit = async (data: IssueForm) => {
        try {
            await axios.post("/api/issues", data);
            router.push("/issues");
            toast("issue created successfully");
        } catch (error) {
            console.log(error);
            toast("failed to create issue");
        }
    }
    const { register, control, handleSubmit } = useForm<IssueForm>();
    return (
        <form
            className="p-5 space-y-3"
            onSubmit={handleSubmit(formSubmit)}
        >
            <TextField.Root
                placeholder="Title"
                className="max-w-xl"
                {...register("title")}
            />
            <Controller
                name="description"
                control={control}
                //field has the same properties like in the object returned by register()
                render={({ field }) => <SimpleMDE placeholder="description" className="max-w-xl" {...field} />}
            />
            <Button>Submit New Issue</Button>
        </form>
    )
}

export default NewIssue
