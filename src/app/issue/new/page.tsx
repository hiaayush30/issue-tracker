import { Button, TextArea, TextField } from "@radix-ui/themes"

function page() {
    return (
        <div className="p-5 space-y-3">
            <TextField.Root placeholder="Title" className="max-w-xl" />
            <TextArea placeholder="Description" className="max-w-xl" />
            <Button>Submit New Issue</Button>
        </div>
    )
}

export default page
