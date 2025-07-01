//to make page dynamic
export const dynamic = "force-dynamic";
//or
// export const revalidate = 0;  //will work same as abv(in seconds)

// search for next.js route segement config

import { prisma } from "@/lib/prisma"
import { Table } from "@radix-ui/themes"
import IssueStatusBadge from "@/components/IssueStatusBadge";
import IssueActions from "./IssueActions";
import Link from "next/link";
import { Status } from "@prisma/client";
import { DotFilledIcon } from "@radix-ui/react-icons";

type OrderByType = "title" | "status" | "createdAt"

const columns: { label: string, value: OrderByType, className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" }
]

async function IssuesPage({ searchParams }: { searchParams: Promise<{ status: Status, orderBy?: OrderByType }> }) {
  const { status, orderBy } = await searchParams;
  const allowedStatuses = Object.values(Status);

  const correctStatus = allowedStatuses.includes(status) ? status : undefined
  const orderByObject = orderBy && columns.map(col => col.value).includes(orderBy) ?
    { [orderBy]: "asc" } : undefined

  const issues = await prisma.issue.findMany({ where: { status: correctStatus }, orderBy: orderByObject })

  return (
    <div className="p-4">
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {
              columns.map(async (column) =>
                <Table.ColumnHeaderCell
                  key={column.label}
                  className={column.className}
                >
                  <Link href={{
                    query: { ...(await searchParams), orderBy: column.value }
                  }}>
                    <span className="flex gap-1 items-center">
                      {column.label}
                      {orderBy == column.value && <DotFilledIcon />}
                    </span>
                  </Link>
                </Table.ColumnHeaderCell>)
            }
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => {
            return <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={"/issues/" + issue.id}>
                  {issue.title}
                </Link>
                <div className="md:hidden block">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          })}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default IssuesPage
