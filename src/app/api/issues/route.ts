import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createIssueSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1)
})

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const parsed = createIssueSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({
                error: parsed.error.errors
            }, { status: 403 })
        }
        const { description, title } = parsed.data;

        const issue = await prisma.issue.create({
            data: {
                title,
                description 
            }
        })

        return NextResponse.json({
            message: "Issue created",
            issue
        }, { status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: "Internal server error"
        }, { status: 500 })
    }
}