'use client'
import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import ScrollLink from "./ScrollLink";

const features = [
    {
        label: "Simple Bookmarking",
        image: "https://tailwindfromscratch.com/website-projects/bookmark/images/illustration-features-tab-1.svg",
        title: "Bookmark in one click",
        description: "Organize your bookmarks however you like. Our simple drag-and-drop interface gives you complete control over how you manage your favourite sites."
    },
    {
        label: "Speedy Searching",
        image: "https://tailwindfromscratch.com/website-projects/bookmark/images/illustration-features-tab-2.svg",
        title: "Intelligent search",
        description: "Our powerful search feature will help you find saved sites in no time at all. No need to trawl through all of your bookmarks"
    },
    {
        label: "Easy Sharing",
        image: "https://tailwindfromscratch.com/website-projects/bookmark/images/illustration-features-tab-3.svg",
        title: "Share with others",
        description: "Easily share your bookmarks and collections with others. Create a shareable a link that you can send at the click of a button."
    }
];

const Features: React.FC = () => {
    const [selected, setSelected] = useState(0);


    const handleClick = (idx: number) => {
        setSelected(idx);
    };


    return (
        <section className="container mx-auto px-6 py-12 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center space-y-4">
                <h1 className="text-4xl font-bold">Features</h1>
                <p className="text-gray-500 text-center">Our aim is to make it quick and easy for you to access your favourite websites. Your bookmarks sync between your devices so you can access them on the go.</p>
            </div>
            <div className="flex flex-col  items-center md:items-start gap-8 w-full max-w-5xl mx-auto py-12">
                {/* Feature List */}
                <ul className="flex flex-col  w-full md:flex-row gap-2 md:gap-4 md:space-x-8 justify-center md:items-center">
                    {features.map((feature, idx) => (
                        <li key={feature.label} className="w-full justify-center items-center  text-center cursor-pointer">
                            <span
                                className={cn(
                                    "block py-3 px-6 text-lg md:text-sm font-medium text-center transition-colors",
                                    selected === idx
                                        ? "text-blue-500"
                                        : "text-gray-700 border-transparent hover:text-blue-500 hover:bg-gray-100"
                                )}
                                onClick={() => handleClick(idx)}
                            >
                                {feature.label}
                            </span>
                            <Separator orientation="horizontal" className="w-full h-0.5 my-4 bg-gray-200" ></Separator>
                        </li>

                    ))}
                </ul>
                {/* Feature Image and Description */}
                <div className="w-full  flex flex-col md:flex-row space-y-4 md:space-x-2 justify-center items-center">
                    <div className="w-full h-[350px] md:w-1/2 relative" >
                        <Image src={features[selected].image} alt={features[selected].label} layout="fill"
                            objectFit="cover" />
                    </div>
                    <div className="flex flex-col items-center mt-4 space-y-4 md:w-1/2" >
                        <h1 className="text-2xl font-bold">{features[selected].title}</h1>
                        <p className="text-gray-500 text-center">{features[selected].description}</p>
                        <ScrollLink id="top">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md"  >
                                More Info
                            </button>
                        </ScrollLink>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
