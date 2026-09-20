import Link from 'next/link'
import { PageContainer } from '@/components/layout/page-container'

export default function NotFound() {
  return (
    <PageContainer
      title="Page not found"
      description="This page may have moved, or the link may be wrong."
    >
      <Link href="/">Back to home</Link>
    </PageContainer>
  )
}
