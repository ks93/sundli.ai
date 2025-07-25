import Link from 'next/link';
import { PageContainer } from '@/components/layout/page-container';

export default function NotFound() {
  return (
    <PageContainer
      title="404"
      description="Sorry, we couldn't find the page you're looking for."
    >
      <Link
        href="/"
        className="inline-block mt-4 text-sm px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
      >
        Go back home
      </Link>
    </PageContainer>
  );
}
