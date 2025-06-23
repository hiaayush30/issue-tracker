import { z } from "zod";

export const createIssueSchema = z.object({
    title: z.string({ message: "title is required" }).min(1, "title is required"),
    description: z.string({ message: "description is required" }).min(1, { message: "description is required" })
});

export const updateIssueSchema = z.object({
    title: z.string({ message: "title is required" }).min(1, "title is required"),
    description: z.string({ message: "description is required" }).min(1, { message: "description is required" }),
    status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]).optional()
});
