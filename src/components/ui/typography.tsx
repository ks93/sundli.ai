'use client'

import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface TypographyProps {
  children: ReactNode
  className?: string
}

export function H1({ children, className }: TypographyProps) {
  return (
    <h1 className={cn('text-4xl font-bold tracking-tight', className)}>
      {children}
    </h1>
  )
}

export function H2({ children, className }: TypographyProps) {
  return <h2 className={cn('text-2xl font-semibold', className)}>{children}</h2>
}

export function Paragraph({ children, className }: TypographyProps) {
  return <p className={cn('text-muted-foreground', className)}>{children}</p>
}

export function LargeParagraph({ children, className }: TypographyProps) {
  return (
    <p className={cn('text-xl text-muted-foreground', className)}>{children}</p>
  )
}
