"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";

const PricingCard = ({
    category,
    items,
    delay,
}: {
    category: string;
    items: string[];
    delay: number;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="flex flex-col p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-yaksen-red/50 transition-colors"
    >
        <h3 className="text-2xl font-bold text-white mb-6">{category}</h3>
        <ul className="flex-1 space-y-4 mb-8">
            {items.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-yaksen-red shrink-0 mt-0.5" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
        <Link
            href="/#contact"
            className="w-full py-3 text-center font-medium text-yaksen-black bg-white rounded-full hover:bg-yaksen-red hover:text-white transition-all duration-300"
        >
            මිල ගණන් විමසන්න
        </Link>
    </motion.div>
);

export default function Pricing() {
    return (
        <main className="min-h-screen bg-yaksen-black text-white selection:bg-yaksen-red selection:text-white">
            <Navbar />
            <div className="pt-32 pb-20 px-6 md:px-12 container mx-auto">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold mb-6"
                    >
                        ඔබේ <span className="text-yaksen-red">ආයෝජනයට</span> උපරිම වටිනාකමක්
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-400 font-sinhala"
                    >
                        සැඟවුණු ගාස්තු නැත. පැහැදිලි මිල ගණන්.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <PricingCard
                        category="Starters (ආරම්භකයින්ට)"
                        items={["Logo Design", "Brand Book", "Social Media Setup", "Basic Visual Identity"]}
                        delay={0.2}
                    />
                    <PricingCard
                        category="Scalers (වර්ධනය වන්නන්ට)"
                        items={["High-Speed Website", "CMS (Easy Update)", "Google Map Setup", "SEO Optimization"]}
                        delay={0.3}
                    />
                    <PricingCard
                        category="Enterprise (ආයතන සඳහා)"
                        items={["Custom Software", "AI Chatbots", "Data Analysis", "Automation Workflows"]}
                        delay={0.4}
                    />
                </div>
            </div>
            <Footer />
        </main>
    );
}
