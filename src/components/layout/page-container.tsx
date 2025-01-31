'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { H1, LargeParagraph } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
}

export function PageContainer({ children, title, description, className }: PageContainerProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <div className={cn('container max-w-3xl py-10', className)}>
      <div className="space-y-8">
        {!isHomePage && (
          <Link 
            href="/" 
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back home</span>
          </Link>
        )}
        <div className="space-y-4">
          <H1>{title}</H1>
          {description && <LargeParagraph>{description}</LargeParagraph>}
        </div>
        {children}
      </div>
    </div>
  );
} 