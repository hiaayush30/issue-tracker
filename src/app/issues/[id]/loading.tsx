import { Box, Card, Heading, Text } from "@radix-ui/themes"
import { Skeleton } from "@/components/index";

function LoadingIssueDetailPAge() {
  return (
    <Box className="p-4 max-w-xl">
      <Heading><Skeleton /></Heading>
      <div className="flex items-center gap-4 my-1">
        <Skeleton width={"5rem"} />
        <Text><Skeleton width={"8rem"} /></Text>
      </div>
      <Card mt={"4"} className="prose">
        <Skeleton count={3} />
      </Card>
    </Box>
  )
}

export default LoadingIssueDetailPAge
