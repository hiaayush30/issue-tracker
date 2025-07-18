import { prisma } from "@/lib/prisma"
import IssueSummmary from "./IssueSummmary"
import LatestIssues from "./LatestIssues"
import IssueChart from "./IssueChart"


async function page() {
  const open = await prisma.issue.count({where:{status:"OPEN"}})
  const in_progress = await prisma.issue.count({where:{status:"IN_PROGRESS"}})
  const closed = await prisma.issue.count({where:{status:"CLOSED"}})

  return (
    <div className="p-3">
    <LatestIssues/>
    <IssueSummmary closed={closed} inProgress={in_progress} open={open}/>
    <IssueChart closed={closed} inProgress={in_progress} open={open}/>
    </div>
  )
}

export default page
