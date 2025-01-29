import { compareDesc } from 'date-fns';
import Link from 'next/link';
import { getAllEssays, type Essay } from '@/lib/mdx';
import { Metadata } from 'next';
import styles from './essays.module.css';

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
    <div className={styles.container}>
      <h1 className={styles.title}>Essays</h1>
      <div className={styles.essayList}>
        {sortedEssays.length === 0 ? (
          <p>No essays available</p>
        ) : (
          sortedEssays.map((essay: Essay) => (
            <article key={essay.slug} className={styles.article}>
              <Link href={`/essays/${essay.slug}`}>
                <div className={styles.essayContent}>
                  <h2 className={styles.essayTitle}>
                    {essay.frontmatter.title}
                  </h2>
                  <p className={styles.essayDescription}>
                    {essay.frontmatter.description}
                  </p>
                  <div className={styles.tags}>
                    {essay.frontmatter.tags.map((tag: string) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className={styles.essayDate}>
                    {new Date(essay.frontmatter.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </Link>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
