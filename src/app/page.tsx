'use client';

import { useSearchParams } from 'next/navigation';
import { DefaultLanding } from '@/components/landing/versions/default';
import { Dev25Landing } from '@/components/landing/versions/dev25';

export default function Home() {
  const searchParams = useSearchParams();
  const version = searchParams.get('version');

  switch (version) {
    case 'dev25':
      return <Dev25Landing />;
    default:
      return <DefaultLanding />;
  }
}
