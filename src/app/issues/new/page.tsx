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
import Spinner from "@/components/Spinner";

function NewIssue() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    type createIssueType = z.infer<typeof createIssueSchema>;

    const onSubmit = async (data: createIssueType) => {
        try {
            setIsSubmitting(true);
            // createIssue(data) not needed here but good for complex apps where you use same call
            // via multiple components specially sending certain http headers
            await axios.post("/api/issues", data);
            router.push("/issues");
            toast.success("issue created successfully");
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                setError(error.response?.data?.error)
            }
            setIsSubmitting(false);
        }
    }
    const { register, control, handleSubmit, formState: { errors } } = useForm<createIssueType>({
        resolver: zodResolver(createIssueSchema)
    });
    return (
        <div className="max-w-xl px-5 py-4">
            {
                error && <Callout.Root color="red" className="mb-5">
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            }
            <form
                className="space-y-3"
                onSubmit={handleSubmit(onSubmit)}
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

                <Button disabled={isSubmitting}>
                    {isSubmitting ? <>Submitting <Spinner /></> : "Submit New Issue"}
                </Button>
            </form>
        </div>
    )
}

export default NewIssue
