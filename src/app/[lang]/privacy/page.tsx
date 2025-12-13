"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Home, ArrowLeft } from 'lucide-react';

const privacyContent = {
    en: {
        title: 'Privacy Policy',
        lastUpdated: 'Last Updated: December 13, 2025',
        intro: 'At Yaksen, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.',
        sections: [
            {
                title: '1. Information We Collect',
                content: 'We collect information that you provide directly to us, including:\n\n• Name and contact information (email, phone number)\n• Business information and requirements\n• Communication preferences\n• Information from our chatbot interactions\n• Analytics and usage data from our website'
            },
            {
                title: '2. How We Use Your Information',
                content: 'We use the information we collect to:\n\n• Provide and improve our services\n• Communicate with you about projects and inquiries\n• Send relevant updates and marketing materials (with your consent)\n• Analyze website usage and improve user experience\n• Comply with legal obligations'
            },
            {
                title: '3. Information Sharing',
                content: 'We do not sell your personal information. We may share your information with:\n\n• Service providers who assist in our operations\n• Professional advisors (lawyers, accountants)\n• Law enforcement when required by law\n• Business partners with your explicit consent'
            },
            {
                title: '4. Data Security',
                content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.'
            },
            {
                title: '5. Your Rights',
                content: 'You have the right to:\n\n• Access your personal data\n• Request correction of inaccurate data\n• Request deletion of your data\n• Object to processing of your data\n• Withdraw consent at any time\n\nTo exercise these rights, please contact us at contact@yaksen.com'
            },
            {
                title: '6. Cookies and Tracking',
                content: 'We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand user behavior. You can control cookie preferences through your browser settings.'
            },
            {
                title: '7. Changes to This Policy',
                content: 'We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the "Last Updated" date.'
            },
            {
                title: '8. Contact Us',
                content: 'If you have questions about this Privacy Policy, please contact us at:\n\nEmail: contact@yaksen.com\nPhone: +94 76 666 4004\nLocation: Sri Lanka'
            }
        ]
    },
    si: {
        title: 'රහස්‍යතා ප්‍රතිපත්තිය',
        lastUpdated: 'අවසන් වරට යාවත්කාලීන කළේ: 2025 දෙසැම්බර් 13',
        intro: 'Yaksen හි අපි ඔබේ රහස්‍යතාව ආරක්ෂා කිරීමට සහ ඔබේ පුද්ගලික තොරතුරු වල ආරක්ෂාව සහතික කිරීමට කැපවී සිටිමු. මෙම රහස්‍යතා ප්‍රතිපත්තිය මගින් අපි ඔබේ තොරතුරු එකතු කරන, භාවිතා කරන, හෙළි කරන සහ ආරක්ෂා කරන ආකාරය පැහැදිලි කරයි.',
        sections: [
            {
                title: '1. අපි එකතු කරන තොරතුරු',
                content: 'ඔබ අපට සෘජුවම සපයන තොරතුරු අපි එකතු කරමු:\n\n• නම සහ සම්බන්ධතා තොරතුරු (email, දුරකථන අංකය)\n• ව්‍යාපාර තොරතුරු සහ අවශ්‍යතා\n• සන්නිවේදන මනාපයන්\n• අපගේ chatbot අන්තර්ක්‍රියා වලින් තොරතුරු\n• වෙබ් අඩවියේ විශ්ලේෂණ සහ භාවිත දත්ත'
            },
            {
                title: '2. අපි ඔබේ තොරතුරු භාවිතා කරන ආකාරය',
                content: 'අපි එකතු කරන තොරතුරු භාවිතා කරන්නේ:\n\n• අපගේ සේවා සැපයීම සහ වැඩිදියුණු කිරීම\n• ව්‍යාපෘති සහ විමසීම් පිළිබඳව ඔබ සමඟ සන්නිවේදනය කිරීම\n• අදාළ යාවත්කාලීන සහ අලෙවිකරණ ද්‍රව්‍ය යැවීම (ඔබේ කැමැත්ත සමඟ)\n• වෙබ් අඩවිය භාවිතය විශ්ලේෂණය කිරීම\n• නීතිමය බැඳීම් වලට අනුකූල වීම'
            },
            {
                title: '3. තොරතුරු බෙදා ගැනීම',
                content: 'අපි ඔබේ පුද්ගලික තොරතුරු විකුණන්නේ නැත. අපි ඔබේ තොරතුරු බෙදා ගන්නා අය:\n\n• අපගේ මෙහෙයුම් වලට සහාය වන සේවා සපයන්නන්\n• වෘත්තීය උපදේශකයින් (නීතිඥයින්, ගණකාධිකාරීන්)\n• නීතිය මගින් අවශ්‍ය විටදී නීතිය බලාත්මක කිරීම\n• ඔබේ පැහැදිලි කැමැත්ත සමඟ ව්‍යාපාර සහකරුවන්'
            },
            {
                title: '4. දත්ත ආරක්ෂාව',
                content: 'අනවසර ප්‍රවේශය, වෙනස් කිරීම, හෙළිදරව්ව හෝ විනාශය වලින් ඔබේ පුද්ගලික තොරතුරු ආරක්ෂා කිරීම සඳහා අපි සුදුසු තාක්ෂණික සහ ​​සංවිධානාත්මක පියවර ක්‍රියාත්මක කරමු.'
            },
            {
                title: '5. ඔබේ අයිතිවාසිකම්',
                content: 'ඔබට අයිතියක් ඇත:\n\n• ඔබේ පුද්ගලික දත්ත වෙත ප්‍රවේශ වීමට\n• සාවද්‍ය දත්ත නිවැරදි කිරීමට ඉල්ලීම\n• ඔබේ දත්ත මකා දැමීමට ඉල්ලීම\n• ඔබේ දත්ත සැකසීමට විරුද්ධ වීම\n• ඕනෑම වේලාවක කැමැත්ත ආපසු ගැනීම\n\nමෙම අයිතිවාසිකම් භාවිතා කිරීම සඳහා, කරුණාකර contact@yaksen.com වෙත අප හා සම්බන්ධ වන්න'
            },
            {
                title: '6. Cookies සහ Tracking',
                content: 'ඔබේ බ්‍රවුස් කිරීමේ අත්දැකීම වැඩිදියුණු කිරීම, වෙබ් අඩවිය ගමනාගමනය විශ්ලේෂණය කිරීම සහ පරිශීලක හැසිරීම් වටහා ගැනීම සඳහා අපි cookies සහ සමාන ලුහුබැඳීමේ තාක්ෂණයන් භාවිතා කරමු.'
            },
            {
                title: '7. මෙම ප්‍රතිපත්තියේ වෙනස්කම්',
                content: 'අපි කාලයෙන් කාලයට මෙම රහස්‍යතා ප්‍රතිපත්තිය යාවත්කාලීන කළ හැක. ඕනෑම වැදගත් වෙනස්කමක් පිළිබඳව අපි ඔබට දැනුම් දෙන්නෙමු.'
            },
            {
                title: '8. අප හා සම්බන්ධ වන්න',
                content: 'මෙම රහස්‍යතා ප්‍රතිපත්තිය පිළිබඳව ඔබට ප්‍රශ්න ඇත්නම්, කරුණාකර අප හා සම්බන්ධ වන්න:\n\nEmail: contact@yaksen.com\nPhone: +94 76 666 4004\nස්ථානය: ශ්‍රී ලංකාව'
            }
        ]
    }
};

export default function PrivacyPage() {
    const { language } = useLanguage();
    const content = privacyContent[language];

    return (
        <div className="min-h-screen bg-yaksen-black text-white">
            {/* Background gradient */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-gradient-mesh" />

            <div className="container mx-auto px-6 py-20 relative z-10">
                {/* Back button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>{language === 'si' ? 'ආපසු යන්න' : 'Back to Home'}</span>
                    </Link>
                </motion.div>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <h1 className="text-display-2 font-bold mb-4">
                        <span className="text-gradient">{content.title}</span>
                    </h1>
                    <p className="text-sm text-gray-500">{content.lastUpdated}</p>
                </motion.div>

                {/* Introduction */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-12 p-6 glass-panel rounded-2xl"
                >
                    <p className="text-gray-300 leading-relaxed">{content.intro}</p>
                </motion.div>

                {/* Sections */}
                <div className="space-y-8 max-w-4xl">
                    {content.sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.05 }}
                            className="p-6 glass-panel-hover rounded-2xl"
                        >
                            <h2 className="text-2xl font-bold mb-4 text-white">{section.title}</h2>
                            <p className="text-gray-300 leading-relaxed whitespace-pre-line">{section.content}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yaksen-red to-yaksen-orange text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-yaksen-red/50 hover:scale-105 transition-all duration-300"
                    >
                        <Home className="w-5 h-5" />
                        <span>{language === 'si' ? 'අප සමඟ සම්බන්ධ වන්න' : 'Contact Us'}</span>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
