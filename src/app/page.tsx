import Link from 'next/link'
import { Footer } from '@/components/layout/footer'

const styles = {
  container: 'h-full flex flex-col items-center justify-center space-y-8',
  title: 'text-4xl font-bold tracking-tight',
  contentWrapper: 'flex flex-col items-center space-y-4',
  commandHint: 'text-muted-foreground',
  kbd: 'px-2 py-1 text-sm rounded bg-secondary text-secondary-foreground',
  linkContainer: 'flex gap-4',
  link: 'text-sm px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors',
}

export default function Home() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>sundli.ai</h1>

      <div className={styles.contentWrapper}>
        <p className={styles.commandHint}>
          Press <kbd className={styles.kbd}>⌘ K</kbd> to start
        </p>

        <div className={styles.linkContainer}>
          <Link href="/essays" className={styles.link}>
            Essays
          </Link>
          <Link href="/projects" className={styles.link}>
            Projects
          </Link>
          <Link href="/contact" className={styles.link}>
            Contact
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
