import { MDXRemote } from 'next-mdx-remote/rsc';
import { getEssayBySlug, getAllEssays } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PageContainer } from '@/components/layout/page-container';

const styles = {
  header: "space-y-4",
  tagContainer: "flex gap-2 mb-4",
  tag: "text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground",
  date: "text-sm text-muted-foreground",
  content: "prose dark:prose-invert max-w-none"
}

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
    <PageContainer
      title={essay.frontmatter.title}
      description={essay.frontmatter.description}
    >
      <div className={styles.header}>
        <div className={styles.tagContainer}>
          {essay.frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className={styles.tag}
            >
              {tag}
            </span>
          ))}
        </div>
        <time className={styles.date}>
          {new Date(essay.frontmatter.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </div>

      <div className={styles.content}>
        <MDXRemote source={essay.content} />
      </div>
    </PageContainer>
  );
} 