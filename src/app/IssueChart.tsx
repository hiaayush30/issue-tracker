"use client"
import { Card } from '@radix-ui/themes';
import React from 'react'
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts"
interface Props {
    open: number;
    inProgress: number;
    closed: number
}

function IssueChart({ closed, inProgress, open }: Props) {
    const data = [
        { label: "Open", value: open },
        { label: "Closed", value: closed },
        { label: "In Progress", value: inProgress },
    ]
    return (
        <Card>
            <ResponsiveContainer width={"100%"} height={300} >
                <BarChart data={data}>
                    <XAxis dataKey={"label"} />
                    <YAxis />
                    <Bar dataKey={"value"} barSize={60} style={{fill:"var(--accent-9"}} />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    )
}

export default IssueChart
