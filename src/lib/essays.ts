import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Essay {
    slug: string;
    title: string;
    date: string;
    description: string;
    tags: string[];
    content: string;
}

const essaysDirectory = path.join(process.cwd(), 'src/app/essays/content');

export function getAllEssays(): Essay[] {
    // Get all .mdx files from the essays directory
    const fileNames = fs.readdirSync(essaysDirectory);
    const allEssaysData = fileNames
        .filter(fileName => fileName.endsWith('.mdx'))
        .map(fileName => {
            // Remove ".mdx" from file name to get slug
            const slug = fileName.replace(/\.mdx$/, '');

            // Read markdown file as string
            const fullPath = path.join(essaysDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');

            // Use gray-matter to parse the post metadata section
            const { data, content } = matter(fileContents);

            // Combine the data with the slug
            return {
                slug,
                content,
                ...(data as Omit<Essay, 'slug' | 'content'>),
            };
        });

    // Sort essays by date
    return allEssaysData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getEssayBySlug(slug: string): Essay | null {
    try {
        const fullPath = path.join(essaysDirectory, `${slug}.mdx`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            content,
            ...(data as Omit<Essay, 'slug' | 'content'>),
        };
    } catch {
        return null;
    }
} 