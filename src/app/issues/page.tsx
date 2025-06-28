//to make page dynamic
export const dynamic = "force-dynamic";
//or
// export const revalidate = 0;  //will work same as abv(in seconds)

// search for next.js route segement config

import { prisma } from "@/lib/prisma"
import { Table } from "@radix-ui/themes"
import IssueStatusBadge from "@/components/IssueStatusBadge";
import IssueActions from "./IssueActions";
import Link from "@/components/Link";
import { Status } from "@prisma/client";

async function IssuesPage({ searchParams }: { searchParams: Promise<{ status: Status }> }) {
  const { status } = await searchParams;
  const allowedStatuses = Object.values(Status);
  const issues = allowedStatuses.includes(status) ?
    await prisma.issue.findMany({ where: { status } }) : await prisma.issue.findMany()
  return (
    <div className="p-4">
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Created</Table.ColumnHeaderCell>
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
