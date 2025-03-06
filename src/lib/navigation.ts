'use client';

import { useSearchParams } from 'next/navigation';

export function useVersionedNavigation() {
  const searchParams = useSearchParams();
  const version = searchParams.get('version');

  const getVersionedUrl = (path: string) => {
    return `${path}${version ? `?version=${version}` : ''}`;
  };

  return { getVersionedUrl, version };
} 