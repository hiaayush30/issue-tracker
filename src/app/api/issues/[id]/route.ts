import { prisma } from "@/lib/prisma";
import { updateIssueSchema } from "@/lib/validationSchemas";
import { NextRequest, NextResponse } from "next/server";


export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const body = await req.json();
        const parsedBody = updateIssueSchema.safeParse(body);
        if (!parsedBody.success) {
            return NextResponse.json({
                error: "Invalid request | title and description required",
                zod: parsedBody.error.format()
            }, { status: 403 })
        }
        const { description, title, status } = parsedBody.data;
        const { id } = params;
        const parsedId = Number(id);

        if (typeof parsedId !== "number") {
            return NextResponse.json({
                error: "Invalid request | valid id required"
            }, { status: 403 })
        }

        const existing = await prisma.issue.findUnique({ where: { id: parsedId } });
        if (!existing) {
            return NextResponse.json({
                error: "issue not found!"
            }, { status: 404 })
        }

        const issue = await prisma.issue.update({
            where: {
                id: Number(id)
            },
            data: {
                title,
                description,
                status
            }
        })

        return NextResponse.json({
            message: "issue updated successfully",
            issue
        })

    } catch (error) {
        console.log(error);
        NextResponse.json({
            error: "Internal server error"
        }, { status: 500 })
    }
}