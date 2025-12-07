import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, Language } from '../types/content';

const blogDirectory = path.join(process.cwd(), 'src/data/blog');

export function getBlogPosts(lang: Language = 'si'): BlogPost[] {
    const langDir = path.join(blogDirectory, lang);

    // Create directory if it doesn't exist (safety check)
    if (!fs.existsSync(langDir)) {
        return [];
    }

    const fileNames = fs.readdirSync(langDir);

    const posts = fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(fileName => {
            const slug = fileName.replace(/\.md$/, '');
            const fullPath = path.join(langDir, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);

            return {
                slug,
                ...data,
                content,
            } as BlogPost;
        });

    // Sort by date descending
    return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getBlogPost(slug: string, lang: Language = 'si'): BlogPost | null {
    try {
        const fullPath = path.join(blogDirectory, lang, `${slug}.md`);

        if (!fs.existsSync(fullPath)) {
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            ...data,
            content,
        } as BlogPost;
    } catch {
        return null;
    }
}
