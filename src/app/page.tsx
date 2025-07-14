import Pagination from "@/components/Pagination"

function page() {
  return (
    <Pagination currentPage={1} itemCount={100} pageSize={10} />
  )
}

export default page
