'use client';

import Link from 'next/link';
import { useVersionedNavigation } from '@/lib/navigation';

const styles = {
  container: "h-full flex flex-col items-center justify-center space-y-12",
  title: "text-6xl font-bold tracking-tight",
  subtitle: "text-xl text-muted-foreground",
  contentWrapper: "flex flex-col items-center space-y-6",
  linkContainer: "flex gap-6",
  link: "text-base px-6 py-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors",
  footer: "mt-16 text-sm text-muted-foreground"
}

export function Dev25Landing() {
  const currentYear = new Date().getFullYear();
  const { getVersionedUrl } = useVersionedNavigation();

  return (
    <main className={styles.container}>
      <div className="text-center space-y-4">
        <h1 className={styles.title}>sundli.ai</h1>
        <p className={styles.subtitle}>Exploring the intersection of AI and human creativity</p>
      </div>
      
      <div className={styles.contentWrapper}>
        <div className={styles.linkContainer}>
          <Link href={getVersionedUrl('/essays')} className={styles.link}>
            Essays
          </Link>
          <Link href={getVersionedUrl('/projects')} className={styles.link}>
            Projects
          </Link>
          <Link href={getVersionedUrl('/contact')} className={styles.link}>
            Contact
          </Link>
        </div>
      </div>

      <div className={styles.footer}>
        <p>© {currentYear} Kelvin Sundli</p>
      </div>
    </main>
  );
} 