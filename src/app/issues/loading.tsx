import { Skeleton } from "@/components";
import { Table } from '@radix-ui/themes';
import IssueActions from './IssueActions';


function loading() {
  const issues = [1, 2, 3, 4, 5];

  return (
    <div className='p-4'>
      <IssueActions/>
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
            return <Table.Row key={issue}>
              <Table.Cell>
                <Skeleton />
                <div className="md:hidden block">
                  <Skeleton />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          })}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default loading
