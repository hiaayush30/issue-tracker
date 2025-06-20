import Link from 'next/link'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'

const links = [
    {
        label: "Dashboard",
        href: "/dashboard"
    },
    {
        label: "Issues",
        href: "/issues"
    }
]

function NavBar() {
    return (
        <nav className='flex gap-4 px-4 h-14 border-b-1 border-slate-20 items-center mb-5'>
            <Link
                className='text-2xl font-semibold flex gap-1 items-center'
                href={"/"}
            >
                <AiFillBug />
                <h1>Issue Tracker</h1>
            </Link>
            <ul className='flex gap-4'>
                {
                    links.map((link) => (
                        <li key={link.href}>
                            <Link href={link.href} className='text-zinc-600 hover:text-zinc-800 transition-all'>
                                {link.label}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default NavBar
