'use client'

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const faqData = [
    {
        question: "What is Bookmark?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt justo eget ultricies fringilla. Phasellus blandit ipsum quis quam ornare mattis."
    },
    {
        question: "How can I request a new browser?",
        answer: "Vivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula. Suspendisse imperdiet. Vivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula."
    },
    {
        question: "Is there a mobile app?",
        answer: "Sed consectetur quam id neque fermentum accumsan. Praesent luctus vestibulum dolor, ut condimentum urna vulputate eget. Cras in ligula quis est pharetra mattis sit amet pharetra purus."
    },
    {
        question: "What about other Chromium browsers?",
        answer: "Integer condimentum ipsum id imperdiet finibus. Vivamus in placerat mi, at euismod dui. Aliquam vitae neque eget nisl gravida pellentesque non ut velit."
    }
];

const FAQ: React.FC = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <section className="container mx-auto px-6 py-12">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-600">
                        Here are some of our FAQs. If you have any other questions you&apos;d like answered please feel free to email us.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <div key={index} className="border-b border-gray-200">
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex justify-between items-center py-4 text-left hover:text-blue-500 transition-colors"
                            >
                                <span className="font-medium">{faq.question}</span>
                                <svg
                                    className={cn(
                                        "w-5 h-5 transform transition-transform duration-200",
                                        openFaq === index ? "rotate-180" : ""
                                    )}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {openFaq === index && (
                                <div className="pb-4 text-gray-600 animate-in slide-in-from-top-2 duration-200">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors">
                        More Info
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FAQ; 