"use client"

import { SessionProvider } from "next-auth/react"
import React, { ReactNode } from "react"

interface AuthSession {
    children: ReactNode
}

const Provider:React.FC<AuthSession> = ({ children}) => {
    return(
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default Provider