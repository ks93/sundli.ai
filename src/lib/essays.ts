import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export interface Essay {
  slug: string
  title: string
  date: string
  description?: string
  draft: boolean
  content: string
}

const essaysDirectory = path.join(process.cwd(), 'src/content/essays')

export function parseEssay(source: string, filename: string): Essay {
  const slug = filename.replace(/\.md$/, '')
  const fail = (message: string): never => {
    throw new Error(`${filename}: ${message}`)
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/.test(filename)) {
    fail('use a lowercase, hyphen-separated filename ending in .md')
  }
  const { data, content, matter: frontmatter } = matter(source, {})
  if (typeof data.title !== 'string' || !data.title.trim()) {
    fail('title is required')
  }
  // YAML parses unquoted dates as Date objects; accept both authoring styles.
  const date =
    data.date instanceof Date
      ? (frontmatter.match(
          /(?:^|\n)date:\s*(\d{4}-\d{2}-\d{2})(?:\s|$)/,
        )?.[1] ?? data.date.toISOString().slice(0, 10))
      : data.date
  if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    fail('date must be YYYY-MM-DD')
  }
  const timestamp = Date.parse(`${date}T00:00:00Z`)
  if (
    !Number.isFinite(timestamp) ||
    new Date(timestamp).toISOString().slice(0, 10) !== date
  ) {
    fail('date must be a real calendar date')
  }
  if (data.description !== undefined && typeof data.description !== 'string') {
    fail('description must be text')
  }
  if (data.draft !== undefined && typeof data.draft !== 'boolean') {
    fail('draft must be true or false, without quotes')
  }
  return {
    slug,
    title: data.title.trim(),
    date,
    description: data.description?.trim() || undefined,
    draft: data.draft ?? false,
    content,
  }
}

export function getAllEssays({
  directory = essaysDirectory,
  includeDrafts = process.env.NODE_ENV === 'development',
}: { directory?: string; includeDrafts?: boolean } = {}): Essay[] {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((file) => file.isFile() && file.name.endsWith('.md'))
    .map((file) =>
      parseEssay(
        fs.readFileSync(path.join(directory, file.name), 'utf8'),
        file.name,
      ),
    )
    .filter((essay) => includeDrafts || !essay.draft)
    .sort(
      (a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug),
    )
}

export function getEssayBySlug(slug: string): Essay | undefined {
  return getAllEssays().find((essay) => essay.slug === slug)
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`))
}
