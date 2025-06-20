import { prisma } from "@/lib/prisma"
import { Button, Table } from "@radix-ui/themes"
import Link from "next/link"
import IssueStatusBadge from "@/components/IssueStatusBadge";

async function IssuesPage() {
  const issues = await prisma.issue.findMany();

  return (
    <div className="p-4">
      <div className="mb-5">
        <Button>
          <Link href={"/issue/new"}>
            New Issue
          </Link>
        </Button>
      </div>
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
                {issue.title}
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
