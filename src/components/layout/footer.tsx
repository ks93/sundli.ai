'use client';

import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={cn('mt-12 text-sm text-muted-foreground', className)}>
      <p>© {currentYear} Kelvin Sundli</p>
    </footer>
  );
}
