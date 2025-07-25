import { compareDesc } from 'date-fns'
import Link from 'next/link'
import { getAllEssays, type Essay } from '@/lib/mdx'
import { Metadata } from 'next'
import { PageContainer } from '@/components/layout/page-container'

const styles = {
  container: 'space-y-8',
  article: 'group',
  articleContent: 'space-y-3',
  title: 'text-2xl font-semibold group-hover:text-primary transition-colors',
  description: 'text-muted-foreground',
  tagContainer: 'flex gap-2',
  tag: 'text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground',
  date: 'text-sm text-muted-foreground',
}

export const metadata: Metadata = {
  title: 'Essays | sundli.ai',
  description:
    'Collection of essays on AI, software development, and technology',
  openGraph: {
    title: 'Essays | sundli.ai',
    description:
      'Collection of essays on AI, software development, and technology',
    type: 'website',
  },
}

export default async function EssaysPage() {
  const essays = await getAllEssays()
  const sortedEssays = essays.sort((a: Essay, b: Essay) =>
    compareDesc(new Date(a.frontmatter.date), new Date(b.frontmatter.date)),
  )

  return (
    <PageContainer
      title="Essays"
      description="Collection of essays on AI, software development, and technology"
    >
      <div className={styles.container}>
        {sortedEssays.map((essay: Essay) => (
          <article key={essay.slug} className={styles.article}>
            <Link href={`/essays/${essay.slug}`}>
              <div className={styles.articleContent}>
                <h2 className={styles.title}>{essay.frontmatter.title}</h2>
                <p className={styles.description}>
                  {essay.frontmatter.description}
                </p>
                <div className={styles.tagContainer}>
                  {essay.frontmatter.tags.map((tag: string) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <p className={styles.date}>
                  {new Date(essay.frontmatter.date).toLocaleDateString(
                    'en-US',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    },
                  )}
                </p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </PageContainer>
  )
}
