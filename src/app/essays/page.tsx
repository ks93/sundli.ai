import { compareDesc } from 'date-fns';
import Link from 'next/link';
import { getAllEssays, type Essay } from '@/lib/mdx';
import { Metadata } from 'next';
import { PageContainer } from '@/components/layout/page-container';

export const metadata: Metadata = {
  title: 'Essays | sundli.ai',
  description: 'Collection of essays on AI, software development, and technology',
  openGraph: {
    title: 'Essays | sundli.ai',
    description: 'Collection of essays on AI, software development, and technology',
    type: 'website',
  },
};

export default async function EssaysPage() {
  const essays = await getAllEssays();
  const sortedEssays = essays.sort((a: Essay, b: Essay) => 
    compareDesc(new Date(a.frontmatter.date), new Date(b.frontmatter.date))
  );

  return (
    <PageContainer 
      title="Essays" 
      description="Collection of essays on AI, software development, and technology"
    >
      <div className="space-y-8">
        {sortedEssays.map((essay: Essay) => (
          <article key={essay.slug} className="group">
            <Link href={`/essays/${essay.slug}`}>
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold group-hover:text-primary transition-colors">
                  {essay.frontmatter.title}
                </h2>
                <p className="text-muted-foreground">
                  {essay.frontmatter.description}
                </p>
                <div className="flex gap-2">
                  {essay.frontmatter.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {new Date(essay.frontmatter.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </PageContainer>
  );
} 