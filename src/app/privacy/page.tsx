"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function Privacy() {
    return (
        <main className="min-h-screen bg-yaksen-black text-white selection:bg-yaksen-red selection:text-white">
            <Navbar />
            <div className="pt-32 pb-20 px-6 md:px-12 container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="prose prose-invert prose-lg max-w-none"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-8">ඔබේ දත්ත අපට වටිනවා</h1>

                    <p className="text-xl text-gray-300 mb-12 font-sinhala">
                        "අපි ඔබේ නම හෝ විස්තර කිසිම තෙවන පාර්ශවයකට ලබා දෙන්නේ නැත. අපි ලබාගන්නා තොරතුරු පාවිච්චි කරන්නේ ඔබේ ව්‍යාපෘතිය සාර්ථක කිරීමට පමණි."
                    </p>

                    <div className="space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 font-sinhala">අපි එකතු කරන දත්ත</h2>
                            <p className="text-gray-400 font-sinhala">
                                අපි ඔයාගේ නම සහ දුරකථන අංකය ලබා ගන්නේ ව්‍යාපාරික කටයුතු සඳහා සම්බන්ධ කරගැනීමට පමණයි. වෙනත් කිසිදු පෞද්ගලික තොරතුරක් අපි අනවශ්‍ය ලෙස රැස් කරන්නේ නැහැ.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 font-sinhala">දත්ත හුවමාරුව (Data Sharing)</h2>
                            <p className="text-gray-400 font-sinhala">
                                අපි කිසිම විටක ඔයාගේ දත්ත තුන්වන පාර්ශවයකට විකුණන්නේ නැත. ඔයාගේ තොරතුරු Yaksen Studio එක ඇතුලේ විතරක් සුරක්ෂිතව තියෙනවා.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 font-sinhala">කුකීස් (Cookies)</h2>
                            <p className="text-gray-400 font-sinhala">
                                අපි Cookies පාවිච්චි කරන්නේ Site එකේ ක්‍රියාකාරීත්වය සඳහා පමණයි. ඒකෙන් ඔයාට වඩා හොඳ User Experience එකක් ලබා දෙන්න අපිට පුළුවන් වෙනවා.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </main>
    );
}
