import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { createIssueSchema } from "../../../lib/validationSchemas";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export const POST = async (req: NextRequest) => {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized request" }, { status: 401 })
        }
        const body = await req.json();
        const parsed = createIssueSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({
                error: "invalid request | title and description required",
                zod: parsed.error.format()
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