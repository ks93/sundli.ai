import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Footer } from '@/components/layout/footer'
import { Navigation } from '@/components/layout/navigation'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://sundli.ai'),
  title: { default: 'Kelvin Sundli — sundli.ai', template: '%s | sundli.ai' },
  description: 'Writing and projects by Kelvin Sundli.',
  icons: { icon: '/icon.svg', apple: '/apple-touch-icon.png' },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header className="site-header container">
          <Link className="brand" href="/" aria-label="sundli.ai home">
            <Image
              className="brand-light"
              src="/brand/wordmark-ink.svg"
              alt=""
              width={475}
              height={144}
              priority
            />
            <Image
              className="brand-dark"
              src="/brand/wordmark-white.svg"
              alt=""
              width={475}
              height={144}
              priority
            />
          </Link>
          <Navigation />
        </header>
        <main id="main" className="container" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
