// import { LucideIcon } from 'lucide-react';

export interface SocialLink {
    platform: string;
    url: string;
}

export interface ProjectLink {
    label: string;
    url: string;
}

export interface ContactContent {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    address: string;
    social_links: SocialLink[];
    footer_privacy: string;
    footer_rights: string;
    free_consultation_badge: string;
    whatsapp_label: string;
    form_name_label: string;
    form_name_placeholder: string;
    form_phone_label: string;
    form_phone_placeholder: string;
    form_business_label: string;
    form_business_placeholder: string;
    form_service_label: string;
    form_service_placeholder: string;
    form_service_branding: string;
    form_service_web: string;
    form_service_marketing: string;
    form_service_automation: string;
    form_message_label: string;
    form_message_placeholder: string;
    form_submit_button: string;
    form_footer_note: string;
}

// Hero Section
export interface HeroContent {
    eyebrow?: string;
    headline: string;
    highlightText?: string;
    subtitle?: string;
    description: string;
    ctaText: string;
    ctaLink: string;
}

// Services
export interface ProcessStep {
    step_number: string;
    title: string;
    description: string;
}

export interface ServiceCaseStudy {
    title: string;
    client: string;
    image: string;
    result: string;
}

export interface Service {
    id: string;
    title: string;
    subtitle?: string;
    pain_point?: string;
    description: string;
    deliverables?: string | string[];
    icon: string;
    process_steps?: ProcessStep[];
    tech_stack?: string[];
    case_studies?: ServiceCaseStudy[];
}

export interface ServicesContent {
    title: string;
    subtitle?: string;
    services: Service[];
}

// Team
export interface TeamMember {
    id: string;
    name: string;
    role: string;
    description: string;
    icon: string;
    image: string | null;
    social_links?: SocialLink[];
}

export interface TeamContent {
    title: string;
    subtitle: string;
    members: TeamMember[];
}

// Projects
export interface Project {
    id: string;
    slug: string;
    title: string;
    category: string;
    description: string;
    coverImage: string; // Placeholder or real URL
    color: string;
    featured: boolean;
    impact?: string;
    tech_stack?: string[];
    challenge?: string;
    solution?: string;
    result?: string;
    subtitle?: string; // New field
    links?: ProjectLink[]; // New field
    showcase_images?: string[]; // New field
    showcase_videos?: string[]; // New field
    showcase_websites?: string[]; // New field for interactive website embeds
}

export interface ProjectsContent {
    title: string;
    subtitle?: string;
    projects: Project[];
}

// FAQ
export interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

export interface FAQContent {
    title: string;
    subtitle?: string;
    questions: FAQItem[];
}

// Framework
export interface FrameworkStep {
    id: string;
    title: string;
    subtitle?: string;
    pain_point?: string;
    description: string;
    solution?: string | string[];
    deliverables?: string | string[];
    timeline?: string;
    benefit?: string;
    icon: string;
}

export interface FrameworkContent {
    title: string;
    subtitle: string;
    steps: FrameworkStep[];
}

// Toolkit
export interface ToolkitContent {
    label: string;
    tools: string[];
    bottom_text: string;
}

// Blog Post (Markdown frontmatter)
export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    coverImage: string;
    date: string;
    tags: string[];
    lang: string;
    content?: string; // Parsed markdown content
}

// Language type
export type Language = 'en' | 'si';
