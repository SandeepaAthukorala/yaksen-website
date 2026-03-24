"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { getPricingContent } from "@/data/lib/content-loader";
import { useLanguage } from "@/context/LanguageContext";
import type { PricingPackage, PricingCategory } from "@/data/types/content";

// ── Badge Component ──────────────────────────────────────────────
const badgeColors = {
    red: "bg-yaksen-red/10 border-yaksen-red/30 text-yaksen-red",
    orange: "bg-yaksen-orange/10 border-[#FF7E5F]/30 text-[#FF7E5F]",
    purple: "bg-[#667EEA]/10 border-[#667EEA]/30 text-[#667EEA]",
    cyan: "bg-[#00D9FF]/10 border-[#00D9FF]/30 text-[#00D9FF]",
};

function PricingBadge({ text, variant = "red" }: { text: string; variant?: "red" | "orange" | "purple" | "cyan" }) {
    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-sm ${badgeColors[variant]}`}>
            <Icons.Sparkles className="w-3 h-3" />
            {text}
        </span>
    );
}

// ── Feature List ─────────────────────────────────────────────────
function FeatureList({ features }: { features: PricingPackage["features"] }) {
    return (
        <ul className="space-y-3">
            {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                    <Icons.Check className="w-4 h-4 text-yaksen-red shrink-0 mt-0.5" />
                    <span className={`text-sm leading-relaxed ${feature.highlighted ? "text-white font-semibold" : "text-gray-400"}`}>
                        {feature.text}
                    </span>
                </li>
            ))}
        </ul>
    );
}

// ── Pricing Card ─────────────────────────────────────────────────
function PricingCard({ pkg, index }: { pkg: PricingPackage; index: number }) {
    const Icon = Icons[pkg.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
    const isHighlighted = pkg.badge && (pkg.badgeVariant === "orange" || pkg.badgeVariant === "purple" || pkg.badgeVariant === "cyan");

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group"
        >
            {/* Glow effect for highlighted cards */}
            {isHighlighted && (
                <div className="absolute -inset-0.5 bg-gradient-to-r from-yaksen-red to-yaksen-orange rounded-3xl opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500" />
            )}

            <div className={`relative h-full flex flex-col p-6 sm:p-8 rounded-3xl glass-panel-strong glass-panel-hover overflow-hidden ${isHighlighted ? "border-yaksen-red/20" : ""}`}>
                {/* Background number decoration */}
                <div className="absolute top-0 right-0 p-4 opacity-[0.02] font-black text-8xl text-white select-none pointer-events-none">
                    {pkg.price}
                </div>

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-yaksen-red/5 to-yaksen-red/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

                <div className="relative z-10 flex flex-col h-full">
                    {/* Badge */}
                    {pkg.badge && (
                        <div className="mb-4">
                            <PricingBadge text={pkg.badge} variant={pkg.badgeVariant} />
                        </div>
                    )}

                    {/* Icon */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-yaksen-red/20 to-yaksen-orange/20 border border-yaksen-red/20 text-yaksen-red flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-500 shadow-lg shadow-yaksen-red/10">
                        {Icon && <Icon className="w-6 h-6 sm:w-7 sm:h-7" />}
                    </div>

                    {/* Name & Description */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 tracking-tight">{pkg.name}</h3>
                    <p className="text-sm text-white/50 mb-5">{pkg.description}</p>

                    {/* Price */}
                    <div className="mb-6">
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl sm:text-4xl font-black text-gradient">{pkg.price}</span>
                        </div>
                        {pkg.priceNote && (
                            <span className="text-xs text-yaksen-muted mt-1 block">{pkg.priceNote}</span>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                    {/* Features */}
                    <div className="flex-1 mb-6">
                        <FeatureList features={pkg.features} />
                    </div>

                    {/* CTA Button */}
                    <motion.a
                        href={pkg.ctaLink}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className={`block w-full py-4 text-center font-bold rounded-2xl transition-all duration-300 min-h-[56px] flex items-center justify-center ${pkg.ctaVariant === "secondary"
                            ? "border border-yaksen-red/50 text-yaksen-red hover:bg-yaksen-red/10 hover:border-yaksen-red"
                            : "bg-gradient-to-r from-yaksen-red to-yaksen-orange text-white btn-glow shadow-lg shadow-yaksen-red/20 hover:shadow-yaksen-red/40"
                            }`}
                    >
                        {pkg.cta}
                    </motion.a>

                    {/* Trust line */}
                    {pkg.trustLine && (
                        <p className="text-xs text-yaksen-muted text-center mt-3">{pkg.trustLine}</p>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

// ── Addon Card (compact) ─────────────────────────────────────────
function AddonCard({ pkg, index }: { pkg: PricingPackage; index: number }) {
    const Icon = Icons[pkg.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            className="group p-5 sm:p-6 rounded-2xl glass-panel glass-panel-hover relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-yaksen-red/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-yaksen-red/10 group-hover:border-yaksen-red/20 transition-all">
                        {Icon && <Icon className="w-5 h-5 text-yaksen-red" />}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                            <h4 className="font-bold text-white text-sm">{pkg.name}</h4>
                            <span className="text-lg font-black text-gradient">{pkg.price}</span>
                            {pkg.priceNote && <span className="text-[10px] text-yaksen-muted">{pkg.priceNote}</span>}
                        </div>
                        <p className="text-xs text-white/40 mt-0.5 hidden sm:block">{pkg.description}</p>
                    </div>
                </div>
                <motion.a
                    href={pkg.ctaLink}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2.5 text-xs font-bold border border-yaksen-red/50 text-yaksen-red rounded-xl hover:bg-yaksen-red/10 hover:border-yaksen-red transition-all whitespace-nowrap min-h-[44px] flex items-center justify-center"
                >
                    {pkg.cta}
                </motion.a>
            </div>
        </motion.div>
    );
}

// ── Trust Bar ────────────────────────────────────────────────────
function TrustBar({ badges }: { badges: { icon: string; text: string }[] }) {
    return (
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-2 mb-12 justify-center flex-wrap">
            {badges.map((badge, i) => {
                const Icon = Icons[badge.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
                return (
                    <div key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs text-yaksen-muted whitespace-nowrap">
                        {Icon && <Icon className="w-3.5 h-3.5 text-yaksen-red" />}
                        {badge.text}
                    </div>
                );
            })}
        </div>
    );
}

// ── Meta Ad Example ──────────────────────────────────────────────
function MetaAdExample({ example, note }: { example: string; note?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 p-6 sm:p-8 rounded-2xl glass-panel relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-yaksen-purple/5 to-yaksen-red/5 pointer-events-none rounded-2xl" />
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                    <Icons.Calculator className="w-5 h-5 text-yaksen-red" />
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">How It Works</h4>
                </div>

                {/* Visual example */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-xs text-yaksen-muted mb-1">Your Ad Spend</p>
                        <p className="text-2xl font-black text-white">50,000</p>
                        <p className="text-xs text-yaksen-muted">LKR</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <Icons.ArrowRight className="w-6 h-6 text-yaksen-red hidden sm:block" />
                        <Icons.ArrowDown className="w-6 h-6 text-yaksen-red sm:hidden" />
                    </div>
                    <div className="text-center p-4 rounded-xl bg-yaksen-red/10 border border-yaksen-red/20">
                        <p className="text-xs text-yaksen-muted mb-1">Our Fee (20%)</p>
                        <p className="text-2xl font-black text-gradient">10,000</p>
                        <p className="text-xs text-yaksen-muted">LKR</p>
                    </div>
                </div>

                <p className="text-sm text-gray-400 leading-relaxed">{example}</p>
                {note && (
                    <p className="text-xs text-yaksen-muted mt-3 flex items-start gap-2">
                        <Icons.Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        {note}
                    </p>
                )}
            </div>
        </motion.div>
    );
}

// ── Software Note ────────────────────────────────────────────────
function SoftwareNote({ title, description, benefits }: { title: string; description: string; benefits: string[] }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 p-6 sm:p-8 md:p-10 rounded-3xl glass-panel relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-yaksen-purple/5 via-transparent to-yaksen-red/5 pointer-events-none rounded-3xl" />
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yaksen-purple/20 to-yaksen-red/20 border border-yaksen-purple/20 flex items-center justify-center">
                            <Icons.Cloud className="w-5 h-5 text-[#667EEA]" />
                        </div>
                        <h3 className="text-xl font-bold text-white">{title}</h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed">{description}</p>
                </div>
                <div className="flex-1">
                    <ul className="space-y-3">
                        {benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <Icons.CheckCircle className="w-4 h-4 text-[#667EEA] shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-300">{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    );
}

// ── Bottom CTA ───────────────────────────────────────────────────
function BottomCTA({ title, subtitle, buttonText, buttonLink }: { title: string; subtitle: string; buttonText: string; buttonLink: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 p-8 sm:p-12 rounded-3xl glass-panel-strong text-center relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-yaksen-red/10 to-yaksen-orange/5 pointer-events-none rounded-3xl" />
            <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">{title}</h3>
                <p className="text-gray-400 mb-8 max-w-xl mx-auto">{subtitle}</p>
                <motion.a
                    href={buttonLink}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-yaksen-red to-yaksen-orange text-white text-base sm:text-lg font-bold rounded-2xl btn-glow shadow-lg shadow-yaksen-red/20 hover:shadow-yaksen-red/40 transition-all min-h-[56px]"
                >
                    {buttonText}
                    <Icons.ArrowRight className="w-5 h-5" />
                </motion.a>
            </div>
        </motion.div>
    );
}

// ── Category Content ─────────────────────────────────────────────
function CategoryContent({ category }: { category: PricingCategory }) {
    const mainPackages = category.packages.filter(p => !p.isAddon);
    const addonPackages = category.packages.filter(p => p.isAddon);

    return (
        <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
        >
            {/* Category description */}
            {category.description && (
                <p className="text-center text-gray-400 mb-10 max-w-2xl mx-auto">{category.description}</p>
            )}

            {/* Main packages grid */}
            <div className={`grid gap-6 sm:gap-8 ${mainPackages.length === 1
                ? "grid-cols-1 max-w-lg mx-auto"
                : mainPackages.length === 2
                    ? "grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto"
                    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                }`}>
                {mainPackages.map((pkg, i) => (
                    <PricingCard key={pkg.id} pkg={pkg} index={i} />
                ))}
            </div>

            {/* Add-on packages */}
            {addonPackages.length > 0 && (
                <div className="mt-8">
                    <div className="flex items-center gap-2 mb-4">
                        <Icons.Plus className="w-4 h-4 text-yaksen-muted" />
                        <span className="text-xs font-bold text-yaksen-muted uppercase tracking-wider">Add-ons</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {addonPackages.map((pkg, i) => (
                            <AddonCard key={pkg.id} pkg={pkg} index={i} />
                        ))}
                    </div>
                </div>
            )}

            {/* Meta Ads example */}
            {category.example && (
                <MetaAdExample example={category.example} note={category.note} />
            )}

            {/* Category note (for non-meta-ads categories) */}
            {category.note && !category.example && (
                <p className="text-xs text-yaksen-muted text-center mt-6 flex items-center justify-center gap-2">
                    <Icons.Info className="w-3.5 h-3.5" />
                    {category.note}
                </p>
            )}
        </motion.div>
    );
}

// ── Main Pricing Component ───────────────────────────────────────
export default function Pricing() {
    const { language } = useLanguage();
    const content = getPricingContent(language);
    const [activeTab, setActiveTab] = useState(0);

    const tabIcons: Record<string, keyof typeof Icons> = {
        branding: "Palette",
        "social-media": "Share2",
        "meta-ads": "Target",
        "web-development": "Monitor",
    };

    return (
        <section id="pricing" className="py-20 sm:py-32 px-4 sm:px-6 bg-yaksen-black relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-gradient-mesh" />
            <motion.div
                className="absolute top-40 -left-20 w-[400px] h-[400px] bg-yaksen-red/5 rounded-full blur-[120px]"
                animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-20 right-0 w-[300px] h-[300px] bg-[#667EEA]/5 rounded-full blur-[100px]"
                animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.08, 0.05] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />

            <div className="container mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-8"
                >
                    <h2 className="text-display-2 font-bold mb-6">
                        <span className="text-gradient">{content.title}</span>
                    </h2>
                    <p className="text-yaksen-muted text-lg sm:text-xl max-w-2xl mx-auto">{content.subtitle}</p>
                </motion.div>

                {/* Trust Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <TrustBar badges={content.trustBadges} />
                </motion.div>

                {/* Category Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="flex gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-2 mb-10 justify-start sm:justify-center"
                >
                    {content.categories.map((cat, i) => {
                        const iconName = tabIcons[cat.id] || cat.icon;
                        const TabIcon = Icons[iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
                        const isActive = activeTab === i;

                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(i)}
                                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 min-h-[44px] shrink-0 ${isActive
                                    ? "bg-gradient-to-r from-yaksen-red to-yaksen-orange text-white shadow-lg shadow-yaksen-red/25"
                                    : "glass-panel text-yaksen-muted hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {TabIcon && <TabIcon className="w-4 h-4" />}
                                <span className="hidden sm:inline text-[10px] text-white/30 font-mono">{cat.subtitle}</span>
                                {cat.title}
                            </button>
                        );
                    })}
                </motion.div>

                {/* Active Category Content */}
                <AnimatePresence mode="wait">
                    <CategoryContent
                        key={content.categories[activeTab].id}
                        category={content.categories[activeTab]}
                    />
                </AnimatePresence>

                {/* Software Note */}
                <SoftwareNote
                    title={content.softwareNote.title}
                    description={content.softwareNote.description}
                    benefits={content.softwareNote.benefits}
                />

                {/* Bottom CTA */}
                <BottomCTA
                    title={content.bottomCta.title}
                    subtitle={content.bottomCta.subtitle}
                    buttonText={content.bottomCta.buttonText}
                    buttonLink={content.bottomCta.buttonLink}
                />
            </div>
        </section>
    );
}
