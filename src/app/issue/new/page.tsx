"use client"
import React, { useState } from "react"
import { Button, Callout, TextField } from "@radix-ui/themes"
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/lib/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/components/ErrorMessage";

function NewIssue() {
    const router = useRouter();
    const [error, setError] = useState('');

    type createIssueType = z.infer<typeof createIssueSchema>;

    const formSubmit = async (data: createIssueType) => {
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
    const { register, control, handleSubmit, formState: { errors } } = useForm<createIssueType>({
        resolver: zodResolver(createIssueSchema)
    });
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
                <ErrorMessage>{errors.title?.message}</ErrorMessage>

                {/* we cant directly destructure the register() in SimpleMDe so using Controllerr component from useForm */}
                {/* name of Controller same as the property you want to register */}
                <Controller
                    name="description"
                    control={control}
                    //field has the same properties like in the object returned by register()
                    render={({ field }) => <SimpleMDE placeholder="enter description" {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                
                <Button>Submit New Issue</Button>
            </form>
        </div>
    )
}

export default NewIssue
