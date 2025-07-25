import Image from "next/image";

export default function HeroSection(){




       return <section className="container mx-auto px-6 py-12 flex flex-col items-center justify-center">

        <div className="flex flex-col items-center justify-center">
            <Image src="https://tailwindfromscratch.com/website-projects/bookmark/images/illustration-hero.svg" alt="hero" width={500} height={500} />
        </div>


        <div className="flex flex-col items-center justify-center space-y-4 ">
            <h1 className="text-4xl font-bold">
                A Simple Bookmark Manager
            </h1>
            <p className="text-center text-gray-500 justify-around">
                A clean and simple interface to organize your favourite websites. Open a new browser tab and see your sites load instantly. Try it for free.
            </p>
            <div className="flex space-x-4 items-center justify-center ">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Get it on Chrome
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Get it on Firefox
                </button>
            </div>
        </div>
       </section>
}