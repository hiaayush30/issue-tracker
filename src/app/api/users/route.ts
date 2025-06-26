import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (req:NextRequest) => {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        const users = await prisma.user.findMany();
        return NextResponse.json({
            users
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            erro: "Internal server error in fetching users"
        }, { status: 500 })
    }
}