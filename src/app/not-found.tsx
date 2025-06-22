import { Button } from "@radix-ui/themes";
import Link from "next/link"

function Error() {
    return (
        <div className={`p-4 flex flex-col items-center justify-center gap-5`}>
            <div>
                Error 404 : Page not found
            </div>
            <Button>
                <Link href={"/dashboard"}>Go Back</Link>
            </Button>
        </div>
    )
}

export default Error
