import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface BreadcrumbsProps {
  className?: string;
}

export function Breadcrumbs({ className }: BreadcrumbsProps) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  // Generate breadcrumb items with proper links
  const breadcrumbItems = segments.map((segment, index) => {
    const path = `/${segments.slice(0, index + 1).join('/')}`;
    // Convert slug to readable format (e.g., "my-post" -> "My Post")
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return { path, label };
  });

  return (
    <nav className={cn("flex items-center gap-2 text-sm text-muted-foreground", className)}>
      <Link
        href="/"
        className="flex items-center hover:text-primary transition-colors"
      >
        <Home size={16} />
      </Link>
      
      {breadcrumbItems.map((item) => (
        <div key={item.path} className="flex items-center">
          <ChevronRight size={14} className="mx-1" />
          <Link
            href={item.path}
            className="hover:text-primary transition-colors"
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
} 