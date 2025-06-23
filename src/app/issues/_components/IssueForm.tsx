"use client"
import React, { useEffect, useState } from "react"
import { Box, Button, Callout, TextField } from "@radix-ui/themes"
import dynamic from "next/dynamic";
// all components are rendered on server once (even client side ones)
// so components like SimpleMDE which use browser apis like navigator gives issues
// so use dynamic imports using next/dynamic to fix this (setting ssr to false)
// import SimpleMDE from "react-simplemde-editor";
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
import { Issue, Status } from "@prisma/client";
import { DropdownMenu } from "@radix-ui/themes"

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
    ssr: false
})

function IssueForm({ issue }: { issue?: Issue }) {
    const [status, setStatus] = useState<null | Status>(null);
    useEffect(() => {
        if (issue) setStatus(issue.status);
    }, [issue])

    const router = useRouter();
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    type createIssueType = z.infer<typeof createIssueSchema>;

    const onSubmit = async (data: createIssueType) => {
        try {
            setIsSubmitting(true);
            // createIssue(data) not needed here but good for complex apps where you use same call
            // via multiple components specially sending certain http headers
            if (issue) {
                await axios.patch("/api/issues/" + issue.id, { ...data, status });
                router.push("/issues");
                toast.success("issue updated successfully");
                return;
            }
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
                    defaultValue={issue?.title}
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
                    defaultValue={issue?.description}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>

                <div className="flex items-center gap-4">
                    {issue && (
                        <Box>
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <Button variant="soft">
                                        {status == "IN_PROGRESS" ? "IN PROGRESS" : status}
                                        <DropdownMenu.TriggerIcon />
                                    </Button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    <DropdownMenu.Item
                                        color="red"
                                        onClick={() => setStatus("OPEN")}>
                                        OPEN
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item
                                        color="violet"
                                        onClick={() => setStatus("IN_PROGRESS")}>
                                        IN PROGRESS
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item
                                        color="green"
                                        onClick={() => setStatus("CLOSED")}>
                                        CLOSED
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        </Box>
                    )}

                    <Button disabled={isSubmitting}>
                        {isSubmitting ? <> Submitting <Spinner /></> : issue ? "Edit Issue" : "Submit New Issue"}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default IssueForm
