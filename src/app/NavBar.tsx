"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classnames from "classnames";

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
    const currentPath = usePathname();
    return (
        <nav className='flex gap-4 px-4 h-14 border-b items-center'>
            <Link
                className='md:text-2xl text-xl font-semibold flex gap-1 items-center'
                href={"/"}
            >
                <AiFillBug />
                <h1>Issue Tracker</h1>
            </Link>
            <ul className='flex gap-4'>
                {
                    links.map((link) => (
                        <li key={link.href}>
                            <Link href={link.href}
                                className={classnames({
                                    'text-zinc-900 underline underline-offset-4': link.href == currentPath,
                                    'text-zinc-500': link.href != currentPath,
                                    'hover:text-zinc-800 transition-all': true
                                })}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </nav >
    )
}

export default NavBar
