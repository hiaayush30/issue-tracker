import Link from "next/link"

function Error() {
    return (
        <div className="p-4">
            Error 404 : Page not found
            <button>
                <Link href={"/dashboard"}>Go Back</Link>
            </button>
        </div>
    )
}

export default Error
