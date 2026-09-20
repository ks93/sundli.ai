import type { MetadataRoute } from 'next'
import { getAllEssays } from '@/lib/essays'

export const dynamic = 'force-static'
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...['', '/essays', '/projects', '/contact'].map((path) => ({
      url: `https://sundli.ai${path}`,
    })),
    ...getAllEssays({ includeDrafts: false }).map((essay) => ({
      url: `https://sundli.ai/essays/${essay.slug}`,
    })),
  ]
}
