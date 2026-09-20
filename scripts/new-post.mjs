import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { pathToFileURL } from 'node:url'

export function createPost(
  title,
  { directory = resolve('src/content/essays'), now = new Date() } = {},
) {
  title = title.trim()
  if (!title) throw new Error('Usage: npm run new:post -- "Your post title"')
  const slug = title
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  if (!slug)
    throw new Error('Include at least one letter or number in the title.')
  // Use the author's local calendar date, not tomorrow's date in UTC.
  const date = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('-')
  const file = join(directory, `${slug}.md`)
  const source = `---\ntitle: ${JSON.stringify(title)}\ndate: '${date}'\ndraft: true\n---\n\nStart writing here.\n`
  mkdirSync(directory, { recursive: true })
  writeFileSync(file, source, { flag: 'wx' })
  return file
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  try {
    const file = createPost(process.argv.slice(2).join(' '))
    console.log(
      `Created ${file}\n\nPreview with npm run dev. Set draft: false when ready to publish.`,
    )
  } catch (error) {
    console.error(
      error.code === 'EEXIST'
        ? 'A post with that filename already exists. Choose another title; nothing was overwritten.'
        : error.message,
    )
    process.exitCode = 1
  }
}
