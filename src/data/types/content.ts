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
    email: string;
    phone: string;
    address: string;
    social_links: SocialLink[];
}

// Hero Section
export interface HeroContent {
    headline: string;
    highlightText: string;
    subtitle: string;
    description: string;
    ctaText: string;
    ctaLink: string;
}

// Services
export interface Service {
    id: string;
    title: string;
    description: string;
    value_proposition?: string;
    deliverables?: string[];
    icon: string; // Icon name as string, e.g., "Palette"
}

export interface ServicesContent {
    title: string;
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
}

export interface ProjectsContent {
    title: string;
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
    questions: FAQItem[];
}

// Framework
export interface FrameworkStep {
    id: string;
    title: string;
    description: string;
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
