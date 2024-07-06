"use client"

import { usePathname } from "next/navigation"

const Footer = () => {

    const pathname = usePathname()
    const disabled = ["auth","admin"]
    const hideFooter = disabled.includes(pathname.split("/")[1])

    if(hideFooter) return null
    return (
        <div className="text-center bg-secondary p-1 text-sm mt-5 border-t-2 border-primary">
            <h1>Copyright By Zutto</h1>
        </div>
    )
}

export default Footer