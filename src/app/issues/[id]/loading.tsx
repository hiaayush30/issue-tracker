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

// What prose Does: The @tailwindcss/typography plugin introduces the prose class. 
// When you apply this class to a container element (like a <div> or <article>),
// it automatically applies a set of beautiful, well-designed typographic defaults to
// all the "prose" elements within that container.

export default LoadingIssueDetailPAge
