import Pagination from "@/components/Pagination"

async function page({ searchParams }: { searchParams: Promise<{ page: string }> }) {
  const { page } = await searchParams;
  return (
    <Pagination currentPage={Number(page)} itemCount={100} pageSize={10} />
  )
}

export default page
