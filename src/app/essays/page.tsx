import type { Metadata } from 'next'
import { EssayList } from '@/components/essay-list'
import { PageContainer } from '@/components/layout/page-container'
import { getAllEssays } from '@/lib/essays'

export const metadata: Metadata = {
  title: 'Essays',
  description:
    'Notes on AI, technology, and the assumptions worth questioning.',
  alternates: { canonical: '/essays' },
}

export default function EssaysPage() {
  return (
    <PageContainer
      title="Essays"
      description="Notes on AI, technology, and the assumptions worth questioning."
    >
      <EssayList essays={getAllEssays()} />
    </PageContainer>
  )
}
