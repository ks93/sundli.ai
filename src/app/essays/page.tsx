import Link from 'next/link';
import { getAllEssays } from '@/lib/essays';

export default function Essays() {
    const essays = getAllEssays();

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold mb-8">Essays</h1>
            <div className="space-y-8">
                {essays.map((essay) => (
                    <article key={essay.slug} className="border-b border-gray-200 pb-8">
                        <Link href={`/essays/${essay.slug}`} className="block group">
                            <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600">
                                {essay.title}
                            </h2>
                            <p className="text-gray-600 mb-2">{essay.description}</p>
                            <div className="flex items-center space-x-4">
                                <time className="text-sm text-gray-500">
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
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
} 