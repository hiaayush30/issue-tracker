"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { AiFillBug } from 'react-icons/ai'
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { Avatar, Box, Button, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'
import { Skeleton } from '@/components'

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
    const { status, data: session } = useSession();
    useEffect(() => {
        if (status == "unauthenticated") {

        }
    }, [status])
    const currentPath = usePathname();
    return (
        <nav className='px-4 border-b'>
            <Container>
                <div className='flex h-14 gap-4 items-center justify-between'>
                    <Flex direction={"row"} gap={"4"} className='items-center'>
                        <Link
                            className='md:text-2xl text-xl font-semibold flex gap-1 items-center'
                            href={"/"}
                        >
                            <AiFillBug />
                            <h1 className='hidden md:block'>Issue Tracker</h1>
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
                    </Flex>
                    <Box>
                        { 
                            status=="loading" &&
                            <Skeleton width={"3rem"}/>
                        }
                        {status == "unauthenticated" &&
                            (
                                <Button><Link href={"/api/auth/signin"}>Login</Link></Button>
                            )
                        }
                        {status == "authenticated" &&
                            <Flex direction={"row"} gap={"4"}>
                                <DropdownMenu.Root>
                                    <DropdownMenu.Trigger>
                                        <Avatar
                                            src={session.user!.image!}
                                            fallback={"?"}
                                            size={"2"}
                                            radius='full'
                                            className='cursor-pointer'
                                        />
                                    </DropdownMenu.Trigger>
                                    <DropdownMenu.Content>
                                        <DropdownMenu.Label>
                                            <Text size={"2"}>
                                                {session.user?.email}
                                            </Text>
                                        </DropdownMenu.Label>
                                        <DropdownMenu.Item color='red'>
                                            <Link href={"/api/auth/signout"}>Logout</Link>
                                        </DropdownMenu.Item>
                                    </DropdownMenu.Content>
                                </DropdownMenu.Root>
                            </Flex>
                        }
                    </Box>
                </div>
            </Container>
        </nav >
    )
}

export default NavBar
