"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react";

interface MainProps {
    Title: string;
    SubTitle: string;
    children: ReactNode;
}

const Main : React.FC<MainProps> = ({
    Title,
    SubTitle,
    children
}) => {
    return (
        <div className="w-full h-auto bg-secondary py-12 px-20">
            {/* Title */}
            <div className="font-bold flex justify-between items-center">
                <div>
                    <h3 className="text-xs">{Title}</h3>
                    <h1 className="text-md text-muted">{SubTitle}</h1>
                </div>
                <Link href="/menu">
                    <Button variant={"ghost"}>View More</Button>
                </Link>
            </div>
            {children}
        </div>
    );
};

export default Main;
