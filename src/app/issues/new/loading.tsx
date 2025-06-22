import { Box } from "@radix-ui/themes";
import { Skeleton } from "@/components/index";

function loading() {
  return (
    <Box className="max-w-xl p-4">
      <Skeleton />
      <Skeleton height={"20rem"} />
    </Box>
  )
}

export default loading
