'use client'
import { cn } from "@/lib/utils";
import Image from "next/image"
import { useState } from "react"

export default function Header() {

    const [isOpen, setIsOpen] = useState(false);

    console.log(isOpen);

    const imgSrc = isOpen ? "https://tailwindfromscratch.com/website-projects/bookmark/images/logo-bookmark-footer.svg" : "https://tailwindfromscratch.com/website-projects/bookmark/images/logo-bookmark.svg"

    return <nav className="container relative mx-auto p-6" id="top" >
        <div className="flex items-center justify-between" >
            <div className={cn("flex z-30")} >
                <Image src={imgSrc} width={147} height={28} alt="no img"></Image>
            </div>

            <button className={cn(" z-30 block w-[24px] h-[24px]  relative cursor-pointer ")}
                onClick={() => setIsOpen(!isOpen)} >
                <span className={cn("bg-black",{ "rotate-45 translate-y-4 bg-white": isOpen }, "w-[24px] h-[3px]  absolute top-0 left-0 ")}></span>
                <span className={cn({ "hidden": isOpen }, "w-[24px] h-[3px] bg-black absolute top-0 left-0 translate-y-2")}></span>
                <span className={cn("bg-black ",{ "-rotate-45 -translate-y-4 bg-white": isOpen }, "w-[24px] h-[3px] absolute top-0 left-0 translate-y-4")}></span>
            </button>

            {isOpen && <div className="fixed inset-0 z-20 flex-col items-center self-end w-full h-full m-h-screen px-6 py-1 pt-24 pb-4 tracking-widest text-white uppercase divide-y divide-gray-500 opacity-90 bg-slate-900 flex">
                <div className="w-full py-3 text-center cursor-pointer hover:text-pink-500 " >Features</div>
                <div className="w-full py-3 text-center cursor-pointer hover:text-pink-500">Download</div>
                <div className="w-full py-3 text-center cursor-pointer hover:text-pink-500">FAQ</div>
                <div className="w-full py-3 text-center cursor-pointer hover:text-pink-500">Login</div>
                
                </div>}

        </div>
    </nav>

}