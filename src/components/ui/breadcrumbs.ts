import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  path: string;
  label: string;
}

interface BreadcrumbsProps {
  className?: string;
}

const styles = {
  nav: "flex items-center gap-2 text-sm text-muted-foreground",
  link: "flex items-center hover:text-primary transition-colors",
  separator: "flex items-center",
  icon: {
    home: 16,
    chevron: 14,
  },
  mobileHidden: "hidden md:flex", // Pd59d
} as const;

/**
 * Converts a URL segment into a human-readable label
 * Example: "my-blog-post" -> "My blog post"
 */
function formatSegmentLabel(segment: string): string {
  const words = segment.split('-').join(' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/**
 * Breadcrumbs component that automatically generates navigation based on the current path
 * Displays a home icon followed by the current path hierarchy with chevron separators
 */
export function Breadcrumbs({ className }: BreadcrumbsProps) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const [isMobile, setIsMobile] = useState(false); // P5a60

  useEffect(() => { // P3ac7
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const breadcrumbItems: BreadcrumbItem[] = isMobile // Pac79
    ? segments.slice(0, 2).map((segment, index) => ({
        path: `/${segments.slice(0, index + 1).join('/')}`,
        label: formatSegmentLabel(segment),
      }))
    : segments.map((segment, index) => ({
        path: `/${segments.slice(0, index + 1).join('/')}`,
        label: formatSegmentLabel(segment),
      }));

  return (
    <nav className={cn(styles.nav, className, isMobile && styles.mobileHidden)}>
      <Link href="/" className={styles.link}>
        <Home size={styles.icon.home} />
      </Link>
      
      {breadcrumbItems.map((item) => (
        <div key={item.path} className={styles.separator}>
          <ChevronRight size={styles.icon.chevron} className="mx-1" />
          <Link href={item.path} className={styles.link}>
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
