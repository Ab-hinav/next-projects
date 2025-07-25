import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-black">
            <nav className="container mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <Image src="https://tailwindfromscratch.com/website-projects/bookmark/images/logo-bookmark-footer.svg" alt="logo" width={200} height={200} />
                    <div>
                        <ul className="flex  md:space-x-0 md:space-y-0 flex-col  md:flex-row items-center gap-2 justify-center text-white">
                            <li>Features</li>
                            <li>Pricing</li>
                            <li>Contact</li>
                        </ul>
                    </div>
                </div>
            </nav>
        </footer>
    );
}