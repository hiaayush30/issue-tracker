import { Button } from "@radix-ui/themes"
import Link from "next/link"

function IssuesPage() {
  return (
    <div className="p-4">
      <Link href={"/issue/new"}>
        <Button>
          New Issue
        </Button>
      </Link>
    </div>
  )
}

export default IssuesPage
