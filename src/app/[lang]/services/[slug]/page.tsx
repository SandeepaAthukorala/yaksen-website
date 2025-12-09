import React from 'react';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getAllServices } from '@/data/lib/content-loader';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import ServiceHero from '@/components/services/ServiceHero';
import ProcessTimeline from '@/components/services/ProcessTimeline';
import TechStackMarquee from '@/components/services/TechStackMarquee';

export async function generateStaticParams() {
    const langs = ['en', 'si'] as const;
    const params = [];

    // Always use English slugs for consistency
    const services = getAllServices('en');

    for (const lang of langs) {
        for (const service of services) {
            const slug = service.title.toLowerCase().replace(/ & /g, '-and-').replace(/ /g, '-');
            params.push({ lang, slug });
        }
    }

    return params;
}

export default async function ServicePage({ params }: { params: { lang: string; slug: string } }) {
    const { lang, slug } = await params;

    // 1. Find the English service to match the slug -> ID
    const enServices = getAllServices('en');
    const targetService = enServices.find(s => {
        const sSlug = s.title.toLowerCase().replace(/ & /g, '-and-').replace(/ /g, '-');
        return sSlug === slug;
    });

    if (!targetService) {
        notFound();
    }

    // 2. Get the content in the requested language using ID
    const localizedServices = getAllServices(lang as 'en' | 'si');
    const service = localizedServices.find(s => s.id === targetService.id);

    if (!service) {
        notFound();
    }

    // JSON-LD Schema
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.title,
        description: service.description,
        provider: {
            '@type': 'Organization',
            name: 'Yaksen Solutions',
            url: 'https://yaksen.com'
        },
        areaServed: 'LK',
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Deliverables',
            itemListElement: typeof service.deliverables === 'string'
                ? [{ '@type': 'Offer', itemOffered: { '@type': 'Service', name: service.deliverables } }]
                : (service.deliverables as string[]).map(d => ({
                    '@type': 'Offer',
                    itemOffered: { '@type': 'Service', name: d }
                }))
        }
    };

    return (
        <main className="min-h-screen bg-yaksen-black text-white selection:bg-yaksen-red selection:text-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />

            <ServiceHero
                title={service.title}
                subtitle={service.subtitle}
                description={service.description}
                icon={service.icon}
            />

            {service.tech_stack && <TechStackMarquee stack={service.tech_stack} />}

            <section className="py-20 px-6 bg-white/5">
                <div className="container mx-auto max-w-4xl">
                    <div className="grid md:grid-cols-2 gap-12 mb-20">
                        <div>
                            <h2 className="text-2xl font-bold mb-6 text-yaksen-red">The Problem</h2>
                            <div className="bg-red-900/10 border border-red-500/20 p-6 rounded-2xl flex gap-4 items-start">
                                <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                                <p className="text-red-200 font-sinhala leading-relaxed italic">
                                    "{service.pain_point}"
                                </p>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-6 text-white">Our Deliverables</h2>
                            <ul className="space-y-4">
                                {Array.isArray(service.deliverables)
                                    ? service.deliverables.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-300">
                                            <CheckCircle2 className="w-5 h-5 text-yaksen-red shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))
                                    : typeof service.deliverables === 'string'
                                        ? service.deliverables.split(' · ').map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-gray-300">
                                                <CheckCircle2 className="w-5 h-5 text-yaksen-red shrink-0 mt-0.5" />
                                                <span>{item}</span>
                                            </li>
                                        ))
                                        : null
                                }
                            </ul>
                            <Link
                                href={`/${lang}/start-project?service=${slug}`}
                                className="block w-full py-4 mt-8 bg-yaksen-red text-center font-bold rounded-xl hover:bg-red-600 transition-colors"
                            >
                                Start This Project
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {service.process_steps && <ProcessTimeline steps={service.process_steps} />}

            {/* Case Studies Section (Simple Grid for now) */}
            {service.case_studies && (
                <section className="py-24 bg-black">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold mb-12 text-center">Success Stories</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {service.case_studies.map((study, i) => (
                                <div key={i} className="group relative aspect-video overflow-hidden rounded-2xl bg-gray-900 border border-white/10">
                                    {/* Placeholder Image Logic if needed */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                                        <h3 className="text-2xl font-bold mb-1">{study.title}</h3>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400 text-sm">{study.client}</span>
                                            <span className="text-yaksen-red font-bold">{study.result}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </main>
    );
}
