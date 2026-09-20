import type { Metadata } from 'next'
import { PageContainer } from '@/components/layout/page-container'

export const metadata: Metadata = {
  title: 'Projects',
  alternates: { canonical: '/projects' },
}

export default function Projects() {
  return (
    <PageContainer
      title="Projects"
      description="Experiments and things worth sharing."
    >
      <p className="muted">More to come.</p>
    </PageContainer>
  )
}
