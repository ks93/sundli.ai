import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { formatDate, getAllEssays, getEssayBySlug } from '@/lib/essays'

type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return getAllEssays().map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const essay = getEssayBySlug((await params).slug)
  if (!essay) return { title: 'Essay not found' }
  return {
    title: essay.title,
    description: essay.description,
    alternates: { canonical: `/essays/${essay.slug}` },
    robots: essay.draft ? { index: false, follow: false } : undefined,
    openGraph: {
      title: essay.title,
      description: essay.description,
      type: 'article',
      publishedTime: `${essay.date}T00:00:00Z`,
      authors: ['Kelvin Sundli'],
    },
  }
}

export default async function EssayPage({ params }: PageProps) {
  const essay = getEssayBySlug((await params).slug)
  if (!essay) notFound()
  return (
    <article className="reading page">
      <header className="page-header">
        <p className="meta">
          <time dateTime={essay.date}>{formatDate(essay.date)}</time>
          {essay.draft && ' · Draft preview'}
        </p>
        <h1>{essay.title}</h1>
        {essay.description && <p className="lede">{essay.description}</p>}
      </header>
      <div className="prose">
        <Markdown remarkPlugins={[remarkGfm]}>{essay.content}</Markdown>
      </div>
      <p className="back-link">
        <Link href="/essays">Back to essays</Link>
      </p>
    </article>
  )
}
