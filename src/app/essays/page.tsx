import type { Metadata } from 'next'
import { EssayList } from '@/components/essay-list'
import { PageContainer } from '@/components/layout/page-container'
import { getAllEssays } from '@/lib/essays'

export const metadata: Metadata = {
  title: 'Essays',
  description: 'Essays by Kelvin Sundli.',
  alternates: { canonical: '/essays' },
}

export default function EssaysPage() {
  return (
    <PageContainer title="Essays">
      <EssayList essays={getAllEssays()} />
    </PageContainer>
  )
}
