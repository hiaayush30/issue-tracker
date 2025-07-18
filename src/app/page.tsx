import { prisma } from "@/lib/prisma"
import IssueSummmary from "./IssueSummmary"
import LatestIssues from "./LatestIssues"
import IssueChart from "./IssueChart"
import { Flex, Grid } from "@radix-ui/themes"


async function page() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } })
  const in_progress = await prisma.issue.count({ where: { status: "IN_PROGRESS" } })
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } })

  return (
    <Grid columns={{ initial: "1", md: "2" }} className="p-3">
      <Flex direction={"column"}>
        <LatestIssues />
        <IssueSummmary closed={closed} inProgress={in_progress} open={open} />
        <IssueChart closed={closed} inProgress={in_progress} open={open} />
      </Flex>
    </Grid>
  )
}

export default page
