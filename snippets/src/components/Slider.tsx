'use client'

import { useState } from "react";
import Button from "./Button"
import { cn } from "@/lib/utils";
import { IoMdHome } from "react-icons/io";


export default function SideBar(props: { children: React.ReactNode }) {

    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => setIsOpen(!isOpen);


    return <div className="flex h-screen w-screen" >
        <Button classNames="fixed top-0 left-0 z-50 m-4 p-2 " onClick={handleClick} variant="active" >hamburger</Button>
        <div className={cn({
            "hidden": isOpen,
        }, "bg-red-300", "w-sm", "pt-15")} >

            <nav className="w-sm" >
                <div className=" w-full flex items-center justify-between px-5 my-5"><h3>Home</h3><IoMdHome></IoMdHome></div>
                <div className=" w-full flex items-center justify-between px-5 my-5"><h3>Home</h3><IoMdHome></IoMdHome></div>
                <div className=" w-full flex items-center justify-between px-5 my-5"><h3>Home</h3><IoMdHome></IoMdHome></div>
                <div className=" w-full flex items-center justify-between px-5 my-5"><h3>Home</h3><IoMdHome></IoMdHome></div>
                <div className=" w-full flex items-center justify-between px-5 my-5"><h3>Home</h3><IoMdHome></IoMdHome></div>
            </nav>

        </div>
        <div>{props.children}</div>
    </div>

} 