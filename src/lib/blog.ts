import posts from "@/data/blog-posts.json";

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    coverImage: string;
    date: string;
    tags: string[];
}

export function getAllPosts(): BlogPost[] {
    return posts as BlogPost[];
}

export function getPostBySlug(slug: string): BlogPost | undefined {
    return (posts as BlogPost[]).find((post) => post.slug === slug);
}
