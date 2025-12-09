"use client";

import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Github, Facebook, Linkedin, ExternalLink, Users } from "lucide-react";
import { getTeamContent } from "@/data/lib/content-loader";
import { useLanguage } from "@/context/LanguageContext";

// Social icon mapping
const socialIcons: Record<string, React.ComponentType<any>> = {
    GitHub: Github,
    Facebook: Facebook,
    LinkedIn: Linkedin,
    Fiverr: ExternalLink,
};

const TeamMember = ({
    icon: Icon,
    name,
    role,
    description,
    image,
    social_links,
    delay,
}: {
    icon?: React.ComponentType<any>;
    name: string;
    role: string;
    description: string;
    image?: string | null;
    social_links?: { platform: string; url: string }[];
    delay: number;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-yaksen-red/50 transition-all group hover:bg-white/5"
    >
        <div className="flex items-center gap-4 mb-4">
            {image ? (
                <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white/10 group-hover:border-yaksen-red/50 transition-all group-hover:scale-110 transform">
                    <img src={image} alt={name} className="w-full h-full object-cover" />
                </div>
            ) : (
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-yaksen-red/20 to-transparent flex items-center justify-center group-hover:from-yaksen-red/30 transition-colors">
                    {Icon && <Icon className="w-8 h-8 text-yaksen-red" />}
                </div>
            )}
            <div>
                <h3 className="text-lg font-bold text-white group-hover:text-yaksen-red transition-colors">{name}</h3>
                <p className="text-yaksen-red/80 text-sm font-medium">{role}</p>
            </div>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed font-sinhala mb-4">
            {description}
        </p>

        {social_links && social_links.length > 0 && (
            <div className="flex gap-2 pt-4 border-t border-white/5">
                {social_links.map((link, i) => {
                    const SocialIcon = socialIcons[link.platform] || ExternalLink;
                    return (
                        <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center hover:bg-yaksen-red/20 hover:text-yaksen-red transition-all"
                            title={link.platform}
                        >
                            <SocialIcon className="w-4 h-4" />
                        </a>
                    );
                })}
            </div>
        )}
    </motion.div>
);

export default function Team() {
    const { language } = useLanguage();
    const content = getTeamContent(language);

    return (
        <section className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                {/* Header with member count badge */}
                <div className="mb-12 md:mb-16">
                    <div className="flex items-center gap-3 mb-4">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold text-white font-sinhala"
                        >
                            {content.title}
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-yaksen-red/10 border border-yaksen-red/30 rounded-full"
                        >
                            <Users className="w-4 h-4 text-yaksen-red" />
                            <span className="text-sm font-medium text-yaksen-red">{content.members.length}</span>
                        </motion.div>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 text-lg font-sinhala"
                    >
                        {content.subtitle}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                    {content.members.map((member, index) => {
                        const Icon = Icons[member.icon as keyof typeof Icons] as React.ComponentType<any>;
                        return (
                            <TeamMember
                                key={member.id}
                                icon={Icon}
                                name={member.name}
                                role={member.role}
                                description={member.description}
                                image={member.image}
                                social_links={member.social_links}
                                delay={0.2 + index * 0.1}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
