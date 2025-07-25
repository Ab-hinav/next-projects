import Footer from "@/components/Footer";
import Header from "@/components/Header";


export default function PracticeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Header />
            {children}
            <footer className="bg-blue-500 text-white">
                <div className="container mx-auto px-6 py-12 text-center ">
                    <h2 className="text-lg font-bold">35,000+ Already Joined</h2>
                    <h1 className="text-4xl font-bold" >Stay up-to-date with what we&apos;re doing</h1>
                    <div className=" mt-4 flex flex-col space-y-2 md:space-y-0 md:flex-row justify-center items-center gap-2" >
                        <input className="border-2 border-white rounded-md p-2 bg-white text-black"  type="text" placeholder="Enter your email" />
                        <button className="bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-blue-100 transition-colors">Contact Us</button>
                    </div>
                </div>
            </footer>
            <Footer />
        </div>
    );
}
