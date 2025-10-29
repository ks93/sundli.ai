import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { Space_Grotesk } from 'next/font/google'
import { cn } from '@/lib/utils'
import { CommandMenu } from '@/components/cmd-k/command-menu'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kelvin Sundli',
  description: 'Personal website of Kelvin Sundli',
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
}

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn('dark h-full scroll-smooth', grotesk.className)}
    >
      <body
        className={cn(
          GeistSans.className,
          'bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#151515] via-[#0b0717] to-black text-white antialiased min-h-screen',
        )}
      >
        <main className="mx-auto max-w-4xl px-4 py-8 min-h-screen flex flex-col">
          {children}
        </main>
        <CommandMenu />
      </body>
    </html>
  )
}
