"use client";

import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { getTeamContent } from "@/data/lib/content-loader";

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
        className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-yaksen-red/50 transition-colors group"
    >
        <div className="flex items-center gap-4 mb-4">
            {image ? (
                <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10 group-hover:border-yaksen-red/50 transition-colors">
                    <img src={image} alt={name} className="w-full h-full object-cover" />
                </div>
            ) : (
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-yaksen-red/20 transition-colors">
                    {Icon && <Icon className="w-8 h-8 text-white group-hover:text-yaksen-red transition-colors" />}
                </div>
            )}
            <div>
                <h3 className="text-xl font-bold text-white">{name}</h3>
                <p className="text-yaksen-red text-sm font-medium">{role}</p>
            </div>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed font-sinhala mb-4">
            {description}
        </p>

        {social_links && social_links.length > 0 && (
            <div className="flex gap-3 pt-4 border-t border-white/5">
                {social_links.map((link, i) => (
                    <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-yaksen-muted hover:text-white transition-colors bg-white/5 px-2 py-1 rounded-md hover:bg-white/10"
                    >
                        {link.platform}
                    </a>
                ))}
            </div>
        )}
    </motion.div>
);

export default function Team() {
    const content = getTeamContent('si');

    return (
        <section className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <div className="mb-12 md:mb-20">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4 font-sinhala"
                    >
                        {content.title}
                    </motion.h2>
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
