'use client'

import { cn } from "@/lib/utils"
import Image, { StaticImageData } from "next/image"



interface CardProps{
    classNames?:string,
    imageSrc:StaticImageData,
    title:string,
    phone:string,
    email:string,
    location:string,
}


export default function Card({classNames,imageSrc,title,phone,email,location}:CardProps){


    return <div className={cn(classNames,'text-center  flex-col space-y-3 m-6 w-fit h-fit border shadow-2xl rounded  p-10')} >
        <div className="flex justify-center rounded" ><Image  className="rounded"  src={imageSrc} alt="image" width={150} height={150} />
        </div>
        <div className="space-y-1 " >
        <h1 className="text-2xl font-bold" >{title}</h1>
        <p className=" text-md font-light" >{email}</p>
        <p className=" text-md font-light" >{phone}</p>
        <p className=" text-md font-light" >{location}</p>
        </div>
    </div>


}