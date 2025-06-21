"use client"
import React, { useState } from "react"
import { Button, Callout, TextField } from "@radix-ui/themes"
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface IssueForm {
    title: string;
    description: string
}

function NewIssue() {
    const router = useRouter();
    const [error, setError] = useState('');

    const formSubmit = async (data: IssueForm) => {
        try {
            await axios.post("/api/issues", data);
            router.push("/issues");
            toast.success("issue created successfully");
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                setError(error.response?.data?.error)
            }
        }
    }
    const { register, control, handleSubmit } = useForm<IssueForm>();
    return (
        <div className="max-w-xl px-5">
            { 
                error && <Callout.Root color="red" className="mb-5">
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            }
            <form
                className="space-y-3"
                onSubmit={handleSubmit(formSubmit)}
            >
                <TextField.Root
                    placeholder="Title"
                    {...register("title")}
                />
                 {/* we cant directly destructure the register() in SimpleMDe so using Controllerr component from useForm */}
                 {/* name of Controller same as the property you want to register */}
                <Controller
                    name="description"
                    control={control}
                    //field has the same properties like in the object returned by register()
                    render={({ field }) => <SimpleMDE placeholder="enter description" {...field} />}
                />
                <Button>Submit New Issue</Button>
            </form>
        </div>
    )
}

export default NewIssue
