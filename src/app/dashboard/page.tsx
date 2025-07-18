import { prisma } from "@/lib/prisma"
import { Flex, Grid } from "@radix-ui/themes"
import IssueSummmary from "../IssueSummmary"
import IssueChart from "../IssueChart"
import LatestIssues from "../LatestIssues"
import { Metadata } from "next"


async function DashboardPage() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } })
  const in_progress = await prisma.issue.count({ where: { status: "IN_PROGRESS" } })
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } })

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap={"5"} className="py-5">
      <Flex direction={"column"} gap={"5"}>
        <IssueSummmary closed={closed} inProgress={in_progress} open={open} />
        <IssueChart closed={closed} inProgress={in_progress} open={open} />
      </Flex>
      <LatestIssues />
    </Grid>
  )
}

export default DashboardPage

export const metadata : Metadata = {
  title: "Issue Tracker - Dashboard",
  description:"View a summary of Project issues"
}