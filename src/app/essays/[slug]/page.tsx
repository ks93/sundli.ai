import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getEssayBySlug, getAllEssays } from '@/lib/essays';

interface Props {
    params: {
        slug: string;
    };
}

// Generate static pages for all essays at build time
export function generateStaticParams() {
    const essays = getAllEssays();
    return essays.map((essay) => ({
        slug: essay.slug,
    }));
}

export default function Essay({ params }: Props) {
    const essay = getEssayBySlug(params.slug);

    if (!essay) {
        notFound();
    }

    return (
        <article className="max-w-4xl mx-auto py-12 px-4">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{essay.title}</h1>
                <div className="flex items-center space-x-4 mb-4">
                    <time className="text-gray-500">
                        {new Date(essay.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </time>
                    <div className="flex gap-2">
                        {essay.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                <p className="text-xl text-gray-600">{essay.description}</p>
            </header>
            <div className="prose prose-lg dark:prose-invert max-w-none">
                <MDXRemote source={essay.content} />
            </div>
        </article>
    );
} 