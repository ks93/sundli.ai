'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className={cn('mt-12 text-sm text-muted-foreground', className)}>
      <p>© {currentYear ?? ''} Kelvin Sundli</p>
    </footer>
  );
}
