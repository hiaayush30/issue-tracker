import { prisma } from "@/lib/prisma";
import { updateIssueSchema } from "@/lib/validationSchemas";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";


export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized request" }, { status: 401 })
        }
        const body = await req.json();
        const parsedBody = updateIssueSchema.safeParse(body);
        if (!parsedBody.success) {
            return NextResponse.json({
                error: "Invalid request | title and description required",
                zod: parsedBody.error.format()
            }, { status: 403 })
        }
        const { description, title, status, assignedToUserId } = parsedBody.data;
        const { id } = await params;
        const parsedId = Number(id);

        if (isNaN(parsedId)) {
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
                status,
                assignedToUserId
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

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized request" }, { status: 401 })
        }
        const { id } = await params;
        const parsedId = Number(id);

        if (isNaN(parsedId)) {
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

        const issue = await prisma.issue.delete({
            where: {
                id: Number(id)
            }
        })

        return NextResponse.json({
            message: "issue deleted successfully",
            issue
        })

    } catch (error) {
        console.log(error);
        NextResponse.json({
            error: "Internal server error"
        }, { status: 500 })
    }
}