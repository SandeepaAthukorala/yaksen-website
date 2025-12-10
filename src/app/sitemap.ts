import { MetadataRoute } from 'next';
import { getAllServices } from '@/data/lib/content-loader';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://yaksen.com';
    const currentDate = new Date().toISOString();
    const langs = ['en', 'si'];

    const staticRoutes = [
        '',
        // Commented out routes that don't exist yet under [lang]
        // '/work',
        // '/pricing',
        // '/blog',
        // '/privacy',
    ];

    let sitemap: MetadataRoute.Sitemap = [];

    // Generate static routes for each language
    for (const lang of langs) {
        for (const route of staticRoutes) {
            sitemap.push({
                url: `${baseUrl}/${lang}${route}`,
                lastModified: currentDate,
                changeFrequency: route === '' ? 'daily' : 'weekly',
                priority: route === '' ? 1.0 : 0.8,
            });
        }

        // Generate service routes
        const services = await Promise.resolve(getAllServices(lang as 'en' | 'si'));
        for (const service of services) {
            const slug = service.title.toLowerCase().replace(/ & /g, '-and-').replace(/ /g, '-');
            sitemap.push({
                url: `${baseUrl}/${lang}/services/${slug}`,
                lastModified: currentDate,
                changeFrequency: 'weekly',
                priority: 0.9,
            });
        }
    }

    return sitemap;
}
