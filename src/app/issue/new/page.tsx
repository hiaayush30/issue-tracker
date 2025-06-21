"use client"
import { Button, TextField } from "@radix-ui/themes"
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

function page() {
    return (
        <div className="p-5 space-y-3">
            <TextField.Root placeholder="Title" className="max-w-xl" />
            <SimpleMDE  placeholder="description" className="max-w-xl"/>

            <Button>Submit New Issue</Button>
        </div>
    )
}

export default page
