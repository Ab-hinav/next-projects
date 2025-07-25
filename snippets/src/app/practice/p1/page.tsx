import Download from "@/components/Download";
import Features from "@/components/Features";
import HeroSection from "@/components/Hero";
import FAQ from "@/components/FAQ";
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import Image from "next/image";

const cardData = [
  {
    title: "Simple Bookmarking",
    description: "Organize your bookmarks however you like",
    content: "Our simple drag-and-drop interface gives you complete control over how you manage your favourite sites.",
    buttonText: "Learn More",
    image: "https://tailwindfromscratch.com/website-projects/bookmark/images/logo-chrome.svg"
  },
  {
    title: "Speedy Searching",
    description: "Find what you need in no time",
    content: "Our powerful search feature will help you find saved sites in no time at all. No need to trawl through all of your bookmarks.",
    buttonText: "Try Search",
    image: "https://tailwindfromscratch.com/website-projects/bookmark/images/logo-chrome.svg"
  },
  {
    title: "Easy Sharing",
    description: "Share with others effortlessly",
    content: "Easily share your bookmarks and collections with others. Create a shareable link that you can send at the click of a button.",
    buttonText: "Share Now",
    image: "https://tailwindfromscratch.com/website-projects/bookmark/images/logo-chrome.svg"
  }
];

export default function Page() {
  return <div>
    <HeroSection />
    <Features />
    <Download />
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData.map((card, index) => (
          <Card className="items-center justify-center h-full" key={index}>
            <Image src={card.image} alt={card.title} width={100} height={100} />

            <CardContent>
              <CardDescription>{card.description}</CardDescription>
            </CardContent>
            <CardFooter className="w-full" >
              <button className="bg-blue-500 text-white px-4 py-2 w-full rounded-md hover:bg-blue-600 transition-colors">
                {card.buttonText}
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
    <FAQ />

    
  </div>;
}