import Link from "next/link"

function Error() {
    return (
        <div>
            Error 404 : Page not found
            <button>
                <Link href={"/dashboard"}>Go Back</Link>
            </button>
        </div>
    )
}

export default Error
