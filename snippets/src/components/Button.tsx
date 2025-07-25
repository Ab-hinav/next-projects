'use client'

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ButtonProps {
    variant: "active" | "secondary",
    onClick?: (e: unknown) => void | null,
    classNames?: string
    type?: 'submit'
    children: ReactNode
}


export default function Button({
    variant,
    classNames,
    type,
    onClick,
    children,
}: ButtonProps) {



    return <button className={
        cn({
            "bg-cyan-300 text-black p-2 rounded": variant === "active",
            "bg-gray-400 text-white p-2 rounded": variant === "secondary"
        }, classNames, "cursor-pointer", "hover:bg-amber-50")
    } onClick={onClick} type={type}>{children}</button>




}