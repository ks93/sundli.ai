'use client'

import { usePathname } from 'next/navigation'
import { H1, LargeParagraph } from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'

const styles = {
  container: 'container max-w-3xl py-10',
  content: 'space-y-8',
  header: 'space-y-4',
}

interface PageContainerProps {
  children: React.ReactNode
  title: string
  description?: string
  className?: string
}

export function PageContainer({
  children,
  title,
  description,
  className,
}: PageContainerProps) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return (
    <div className={cn(styles.container, className)}>
      <div className={styles.content}>
        {!isHomePage && <Breadcrumbs />}
        <div className={styles.header}>
          <H1>{title}</H1>
          {description && <LargeParagraph>{description}</LargeParagraph>}
        </div>
        {children}
      </div>
    </div>
  )
}
