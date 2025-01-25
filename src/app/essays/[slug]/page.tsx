import { MDXRemote } from 'next-mdx-remote/rsc';
import { getEssayBySlug, getAllEssays } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

type PageProps = {
  params: Promise<{ slug: string }>;
};

// This generates all possible essay paths at build time
export async function generateStaticParams() {
  const essays = await getAllEssays();
  return essays.map((essay) => ({
    slug: essay.slug,
  }));
}

// Generate metadata for each essay
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const essay = await getEssayBySlug(slug);
  
  if (!essay) {
    return {
      title: 'Essay Not Found',
    };
  }

  return {
    title: essay.frontmatter.title,
    description: essay.frontmatter.description,
    openGraph: {
      title: essay.frontmatter.title,
      description: essay.frontmatter.description,
      type: 'article',
      publishedTime: essay.frontmatter.date,
      authors: ['Kelvin Sundli'],
      tags: essay.frontmatter.tags,
    },
  };
}

export default async function EssayPage(props: PageProps) {
  const { slug } = await props.params;
  const essay = await getEssayBySlug(slug);

  if (!essay) {
    notFound();
  }

  return (
    <article className="container max-w-3xl py-10">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{essay.frontmatter.title}</h1>
        <p className="text-xl text-muted-foreground mb-4">
          {essay.frontmatter.description}
        </p>
        <div className="flex gap-2 mb-4">
          {essay.frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <time className="text-sm text-muted-foreground">
          {new Date(essay.frontmatter.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </header>

      <div className="prose dark:prose-invert max-w-none">
        <MDXRemote source={essay.content} />
      </div>
    </article>
  );
} 