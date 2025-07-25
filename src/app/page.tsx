import Link from 'next/link'
import { Footer } from '@/components/layout/footer'
import { Space_Grotesk } from 'next/font/google'

const titleFont = Space_Grotesk({
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
})

const styles = {
  container: 'min-h-screen flex flex-col items-center justify-center gap-8',
  title:
    'text-6xl font-extrabold tracking-tight bg-gradient-to-r from-fuchsia-500 via-cyan-500 to-fuchsia-500 text-transparent bg-clip-text bg-[length:200%_200%] animate-gradient-move',
  contentWrapper: 'flex flex-col items-center gap-4',
  commandHint: 'text-muted-foreground',
  kbd: 'px-2 py-1 text-sm rounded bg-secondary text-secondary-foreground',
  linkContainer: 'flex gap-4',
  link: 'text-sm px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/80 transition-colors border border-primary/50 hover:border-primary',
}

export default function Home() {
  return (
    <main className={styles.container}>
      <h1 className={`${styles.title} ${titleFont.className}`}>sundli.ai</h1>

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
