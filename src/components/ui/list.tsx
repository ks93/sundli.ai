'use client'

import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface ListProps {
  children: ReactNode
  className?: string
}

export function List({ children, className }: ListProps) {
  return (
    <ul className={cn('list-disc list-inside space-y-2', className)}>
      {children}
    </ul>
  )
}

export function ListItem({ children, className }: ListProps) {
  return <li className={cn('text-muted-foreground', className)}>{children}</li>
}
