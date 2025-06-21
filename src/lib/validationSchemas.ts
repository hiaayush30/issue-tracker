import { z } from "zod";

export const createIssueSchema = z.object({
    title: z.string({message:"title is required"}).min(1),
    description: z.string({message:"description is required"}).min(1)
});
