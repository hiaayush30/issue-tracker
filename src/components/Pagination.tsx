"use client"
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
    itemCount: number;
    pageSize: number;
    currentPage: number
}

function Pagination({ currentPage, itemCount, pageSize }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString())
        router.push("?"+params.toString())
    }

    const pageCount = Math.ceil(itemCount / pageSize);
    if (pageCount < 1) return null;
    return (
        <Flex gap={"2"} p={"3"} align={"center"}>
            <Button
                color="gray" variant="soft"
                disabled={currentPage == 1}
                onClick={() => changePage(1)}
            >
                <DoubleArrowLeftIcon />
            </Button>
            <Button
                color="gray" variant="soft"
                disabled={currentPage == 1}
                onClick={() => changePage(currentPage-1)}
            >
                <ChevronLeftIcon />
            </Button>
            <Text size={"2"}>Page {currentPage} of {pageCount}</Text>
            <Button
                color="gray" variant="soft"
                disabled={currentPage == pageCount}
                onClick={() => changePage(currentPage+1)}
            >
                <ChevronRightIcon />
            </Button>
            <Button
                color="gray" variant="soft"
                disabled={currentPage == pageCount}
                onClick={() => changePage(pageCount)}
            >
                <DoubleArrowRightIcon />
            </Button>
        </Flex>
    )
}

export default Pagination
