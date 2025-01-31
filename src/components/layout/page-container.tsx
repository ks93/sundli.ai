'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface PageContainerProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export function PageContainer({ children, title, description }: PageContainerProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <div className="container max-w-3xl py-10">
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
          <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-xl text-muted-foreground">{description}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
} 