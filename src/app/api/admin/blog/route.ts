import { NextRequest, NextResponse } from 'next/server';
import { readJsonFile, writeJsonFile, isLocalhost } from '@/lib/file-utils';
import fs from 'fs/promises';
import path from 'path';

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    featured_image?: string;
    tags?: string[];
    published: boolean;
}

// GET - Fetch all blog posts
export async function GET(request: NextRequest) {
    try {
        const host = request.headers.get('host');
        if (!isLocalhost(host)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const posts = await readJsonFile<BlogPost[]>('blog-posts.json');
        return NextResponse.json({ posts });
    } catch (error) {
        console.error('Error reading blog posts:', error);
        // Return empty array if file doesn't exist
        return NextResponse.json({ posts: [] });
    }
}

// POST - Add new blog post
export async function POST(request: NextRequest) {
    try {
        const host = request.headers.get('host');
        if (!isLocalhost(host)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const newPost = await request.json();

        let posts: BlogPost[] = [];
        try {
            posts = await readJsonFile<BlogPost[]>('blog-posts.json');
        } catch {
            // File doesn't exist yet, start with empty array
            posts = [];
        }

        // Generate ID if not provided
        if (!newPost.id) {
            const maxId = Math.max(...posts.map((p) => parseInt(p.id) || 0), 0);
            newPost.id = String(maxId + 1);
        }

        // Generate slug from title if not provided
        if (!newPost.slug) {
            newPost.slug = newPost.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');
        }

        // Set date if not provided
        if (!newPost.date) {
            newPost.date = new Date().toISOString().split('T')[0];
        }

        posts.unshift(newPost);
        await writeJsonFile('blog-posts.json', posts);

        // Also create markdown file for blog content
        const blogDir = path.join(process.cwd(), 'src', 'data', 'blog');
        await fs.mkdir(blogDir, { recursive: true });
        const mdFilePath = path.join(blogDir, `${newPost.slug}.md`);
        await fs.writeFile(mdFilePath, newPost.content || '', 'utf-8');

        return NextResponse.json({ success: true, post: newPost });
    } catch (error) {
        console.error('Error adding blog post:', error);
        return NextResponse.json(
            { error: 'Failed to add blog post' },
            { status: 500 }
        );
    }
}

// PUT - Update existing blog post
export async function PUT(request: NextRequest) {
    try {
        const host = request.headers.get('host');
        if (!isLocalhost(host)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const updatedPost = await request.json();
        const posts = await readJsonFile<BlogPost[]>('blog-posts.json');

        const index = posts.findIndex((p) => p.id === updatedPost.id);
        if (index === -1) {
            return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
        }

        const oldSlug = posts[index].slug;
        posts[index] = updatedPost;
        await writeJsonFile('blog-posts.json', posts);

        // Update markdown file
        const blogDir = path.join(process.cwd(), 'src', 'data', 'blog');

        // Delete old file if slug changed
        if (oldSlug !== updatedPost.slug) {
            const oldFilePath = path.join(blogDir, `${oldSlug}.md`);
            try {
                await fs.unlink(oldFilePath);
            } catch (error) {
                console.warn('Could not delete old markdown file:', error);
            }
        }

        const mdFilePath = path.join(blogDir, `${updatedPost.slug}.md`);
        await fs.writeFile(mdFilePath, updatedPost.content || '', 'utf-8');

        return NextResponse.json({ success: true, post: updatedPost });
    } catch (error) {
        console.error('Error updating blog post:', error);
        return NextResponse.json(
            { error: 'Failed to update blog post' },
            { status: 500 }
        );
    }
}

// DELETE - Remove blog post
export async function DELETE(request: NextRequest) {
    try {
        const host = request.headers.get('host');
        if (!isLocalhost(host)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Blog post ID required' }, { status: 400 });
        }

        const posts = await readJsonFile<BlogPost[]>('blog-posts.json');
        const post = posts.find((p) => p.id === id);

        if (!post) {
            return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
        }

        const filteredPosts = posts.filter((p) => p.id !== id);
        await writeJsonFile('blog-posts.json', filteredPosts);

        // Delete markdown file
        const blogDir = path.join(process.cwd(), 'src', 'data', 'blog');
        const mdFilePath = path.join(blogDir, `${post.slug}.md`);
        try {
            await fs.unlink(mdFilePath);
        } catch (error) {
            console.warn('Could not delete markdown file:', error);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting blog post:', error);
        return NextResponse.json(
            { error: 'Failed to delete blog post' },
            { status: 500 }
        );
    }
}
