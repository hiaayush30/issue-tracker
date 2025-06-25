"use client"
import { SessionProvider } from "next-auth/react"
import { PropsWithChildren } from "react"

function AuthProvider(props: PropsWithChildren) {
    return (
        <SessionProvider>
            {props.children}
        </SessionProvider>
    )
}

export default AuthProvider
