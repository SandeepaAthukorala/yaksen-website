"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, ArrowRight, Sparkles, MessageCircle, Facebook, Linkedin } from "lucide-react";
import Link from "next/link";
import { getContactContent } from "@/data/lib/content-loader";
import { useLanguage } from "@/context/LanguageContext";

// Social icon mapping
const socialIcons: Record<string, React.ComponentType<any>> = {
    Facebook: Facebook,
    LinkedIn: Linkedin,
};

// Webhook endpoint
const WEBHOOK_URL = "http://185.215.166.12:5678/webhook/yaksen-website";

export default function Contact() {
    const { language } = useLanguage();
    const content = getContactContent(language);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        business: "",
        service: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError("");
        setSubmitSuccess(false);

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    timestamp: new Date().toISOString(),
                    language: language
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to submit form");
            }

            setSubmitSuccess(true);
            setFormData({
                name: "",
                phone: "",
                business: "",
                service: "",
                message: ""
            });

            // Reset success message after 5 seconds
            setTimeout(() => setSubmitSuccess(false), 5000);
        } catch (error) {
            console.error("Form submission error:", error);
            setSubmitError("Failed to send message. Please try again or contact us directly.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-20 px-6 bg-yaksen-black relative overflow-hidden" id="contact">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-yaksen-red/5 rounded-full blur-3xl" />

            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Left Column: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 font-sinhala tracking-tight">{content.title}</h2>
                        <p className="text-xl text-yaksen-muted mb-12 font-sinhala leading-relaxed">
                            {content.subtitle}
                        </p>

                        {/* Free Consultation Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-3 px-6 py-3 bg-yaksen-red/10 border border-yaksen-red/20 rounded-full mb-10 backdrop-blur-md shadow-[0_0_20px_rgba(241,72,53,0.15)]"
                        >
                            <Sparkles className="w-5 h-5 text-yaksen-red animate-pulse" />
                            <span className="text-base font-bold text-yaksen-red">{content.free_consultation_badge}</span>
                        </motion.div>

                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                <Link
                                    href={`https://wa.me/${content.phone.replace(/[^0-9]/g, "")}`}
                                    target="_blank"
                                    className="flex items-center gap-5 p-5 glass-panel glass-panel-hover rounded-2xl group"
                                >
                                    <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-yaksen-red/20 transition-colors">
                                        <MessageCircle className="text-white group-hover:text-yaksen-red w-7 h-7" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-yaksen-muted font-medium">{content.whatsapp_label}</p>
                                        <p className="text-xl font-bold">{content.phone}</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-yaksen-red transition-colors" />
                                </Link>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                <Link
                                    href={`mailto:${content.email}`}
                                    className="flex items-center gap-5 p-5 glass-panel glass-panel-hover rounded-2xl group"
                                >
                                    <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-yaksen-red/20 transition-colors">
                                        <Mail className="text-white group-hover:text-yaksen-red w-7 h-7" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-yaksen-muted font-medium">Email</p>
                                        <p className="text-xl font-bold">{content.email}</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-yaksen-red transition-colors" />
                                </Link>
                            </motion.div>

                            {/* Social Links - Icon Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                viewport={{ once: true }}
                                className="flex gap-3 mt-6"
                            >
                                {content.social_links.map((link, i) => {
                                    const IconComponent = socialIcons[link.platform] || Facebook;
                                    return (
                                        <Link
                                            key={i}
                                            href={link.url}
                                            target="_blank"
                                            className="w-14 h-14 glass-panel rounded-2xl flex items-center justify-center hover:border-yaksen-red/50 hover:bg-yaksen-red/10 hover:text-yaksen-red transition-all duration-300 hover:scale-110"
                                        >
                                            <IconComponent className="w-6 h-6" />
                                        </Link>
                                    );
                                })}
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.form
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        viewport={{ once: true }}
                        className="space-y-6 glass-panel p-10 rounded-3xl relative"
                        onSubmit={handleSubmit}
                    >
                        {/* Subtle Form Glow */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-yaksen-red/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-white/80 ml-1">{content.form_name_label}</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-yaksen-red/50 focus:bg-white/5 transition-all placeholder:text-white/20 text-white"
                                    placeholder={content.form_name_placeholder}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-white/80 ml-1">{content.form_phone_label}</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-yaksen-red/50 focus:bg-white/5 transition-all placeholder:text-white/20 text-white"
                                    placeholder={content.form_phone_placeholder}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-white/80 ml-1">{content.form_business_label}</label>
                            <input
                                type="text"
                                name="business"
                                value={formData.business}
                                onChange={handleInputChange}
                                className="w-full bg-black/40 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-yaksen-red/50 focus:bg-white/5 transition-all placeholder:text-white/20 text-white"
                                placeholder={content.form_business_placeholder}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-white/80 ml-1">{content.form_service_label}</label>
                            <div className="relative">
                                <select
                                    name="service"
                                    value={formData.service}
                                    onChange={handleInputChange}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-yaksen-red/50 focus:bg-white/5 transition-all text-white appearance-none cursor-pointer"
                                >
                                    <option value="" className="bg-yaksen-black">{content.form_service_placeholder}</option>
                                    <option className="bg-yaksen-black">{content.form_service_branding}</option>
                                    <option className="bg-yaksen-black">{content.form_service_web}</option>
                                    <option className="bg-yaksen-black">{content.form_service_marketing}</option>
                                    <option className="bg-yaksen-black">{content.form_service_automation}</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                                    <ArrowRight className="w-4 h-4 rotate-90" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-white/80 ml-1">{content.form_message_label}</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                                rows={4}
                                className="w-full bg-black/40 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-yaksen-red/50 focus:bg-white/5 transition-all resize-none placeholder:text-white/20 text-white"
                                placeholder={content.form_message_placeholder}
                            />
                        </div>

                        {/* Success Message */}
                        {submitSuccess && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-center"
                            >
                                ✓ Message sent successfully! We'll get back to you soon.
                            </motion.div>
                        )}

                        {/* Error Message */}
                        {submitError && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-center"
                            >
                                {submitError}
                            </motion.div>
                        )}

                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                            className={`w-full py-4 bg-gradient-to-r from-yaksen-red to-[#ff7e5f] text-white font-bold rounded-xl shadow-lg shadow-yaksen-red/20 hover:shadow-yaksen-red/40 transition-all flex items-center justify-center gap-2 btn-glow ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                        >
                            {isSubmitting ? 'Sending...' : content.form_submit_button} <Send className="w-4 h-4" />
                        </motion.button>

                        <p className="text-xs text-center text-yaksen-muted mt-4">
                            {content.form_footer_note}
                        </p>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}
