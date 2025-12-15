import {
    Language,
    HeroContent,
    ServicesContent,
    TeamContent,
    ProjectsContent,
    FAQContent,
    FrameworkContent,
    ToolkitContent,
    ContactContent,
    Service
} from '../types/content';
import heroEn from '../content/en/hero.json';
import heroSi from '../content/si/hero.json';
import servicesEn from '../content/en/services.json';
import servicesSi from '../content/si/services.json';
import teamEn from '../content/en/team.json';
import teamSi from '../content/si/team.json';
import projectsEn from '../content/en/projects.json';
import projectsSi from '../content/si/projects.json';
import faqEn from '../content/en/faq.json';
import faqSi from '../content/si/faq.json';
import frameworkEn from '../content/en/framework.json';
import frameworkSi from '../content/si/framework.json';
import contactEn from '../content/en/contact.json';
import contactSi from '../content/si/contact.json';
import toolkitEn from '../content/en/toolkit.json';
import toolkitSi from '../content/si/toolkit.json';

const content = {
    en: {
        hero: heroEn,
        services: servicesEn,
        team: teamEn,
        projects: projectsEn,
        faq: faqEn,
        framework: frameworkEn,
        contact: contactEn,
        toolkit: toolkitEn,
    },
    si: {
        hero: heroSi,
        services: servicesSi,
        team: teamSi,
        projects: projectsSi,
        faq: faqSi,
        framework: frameworkSi,
        contact: contactSi,
        toolkit: toolkitSi,
    },
};

export function getHeroContent(lang: Language = 'si'): HeroContent {
    return content[lang].hero as unknown as HeroContent;
}

export function getServicesContent(lang: Language = 'si'): ServicesContent {
    return content[lang].services as unknown as ServicesContent;
}

export function getTeamContent(lang: Language = 'si'): TeamContent {
    return content[lang].team as unknown as TeamContent;
}

export function getProjectsContent(lang: Language = 'si'): ProjectsContent {
    return content[lang].projects as unknown as ProjectsContent;
}

export function getFAQContent(lang: Language = 'si'): FAQContent {
    return content[lang].faq as unknown as FAQContent;
}

export function getFrameworkContent(lang: Language = 'si'): FrameworkContent {
    return content[lang].framework as unknown as FrameworkContent;
}

export function getToolkitContent(lang: Language = 'si'): ToolkitContent {
    return content[lang].toolkit as unknown as ToolkitContent;
}


export function getContactContent(lang: Language = 'si'): ContactContent {
    return content[lang].contact as unknown as ContactContent;
}

export function getAllServices(lang: Language = 'si'): Service[] {
    return content[lang].services.services as Service[];
}

export function getServiceBySlug(slug: string, lang: Language = 'si'): Service | undefined {
    const services = content[lang].services.services as Service[];
    return services.find(s => {
        const sSlug = s.title.toLowerCase().replace(/ & /g, '-and-').replace(/ /g, '-');
        return sSlug === slug;
    });
}
