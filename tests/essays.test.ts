import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  mkdtempSync,
  writeFileSync,
  mkdirSync,
  rmSync,
  readFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { getAllEssays, parseEssay, formatDate } from '../src/lib/essays'
import { createPost } from '../scripts/new-post.mjs'

const post = (fields = '', date = "'2026-09-20'") =>
  `---\ntitle: Example\ndate: ${date}\n${fields}---\n\nBody with {braces} and 2 < 3.\n`

test('requires only title and date; quoted and YAML dates format in UTC', () => {
  for (const date of ["'2026-09-20'", '2026-09-20']) {
    const essay = parseEssay(post('', date), 'example.md')
    assert.equal(essay.date, '2026-09-20')
    assert.equal(essay.draft, false)
    assert.equal(essay.description, undefined)
    assert.match(formatDate(essay.date), /20 September 2026/)
  }
})

test('invalid metadata fails with the filename and useful error', () => {
  for (const [source, message] of [
    [post().replace('title: Example', 'title: 5'), /example.md: title/],
    [post('', "'2026-02-30'"), /real calendar date/],
    [post('', '2026-02-30'), /real calendar date/],
    [post('', 'yesterday'), /YYYY-MM-DD/],
    [post('draft: "false"\n'), /draft must be/],
    [post('description: 42\n'), /description must be/],
  ] as const)
    assert.throws(() => parseEssay(source, 'example.md'), message)
})

test('production excludes drafts, sorts newest first and ignores non-post files', (t) => {
  const directory = mkdtempSync(join(tmpdir(), 'sundli-posts-'))
  t.after(() => rmSync(directory, { recursive: true, force: true }))
  writeFileSync(join(directory, 'old.md'), post('', '2025-01-31'))
  writeFileSync(join(directory, 'new.md'), post())
  writeFileSync(join(directory, 'draft.md'), post('draft: true\n'))
  writeFileSync(join(directory, 'notes.txt'), 'ignored')
  mkdirSync(join(directory, 'folder.md'))
  assert.deepEqual(
    getAllEssays({ directory, includeDrafts: false }).map((e) => e.slug),
    ['new', 'old'],
  )
  assert.equal(getAllEssays({ directory, includeDrafts: true }).length, 3)
})

test('new post writes valid YAML, defaults to draft, and never overwrites a post', (t) => {
  const directory = mkdtempSync(join(tmpdir(), 'sundli-new-'))
  t.after(() => rmSync(directory, { recursive: true, force: true }))
  const title = 'A "quiet": exception'
  const file = createPost(title, { directory, now: new Date(2026, 8, 20, 22) })
  const source = readFileSync(file, 'utf8')
  const essay = parseEssay(source, 'a-quiet-exception.md')
  assert.equal(essay.title, title)
  assert.equal(essay.date, '2026-09-20')
  assert.equal(essay.draft, true)
  assert.throws(() => createPost(title, { directory }), { code: 'EEXIST' })
  assert.equal(readFileSync(file, 'utf8'), source)
  assert.throws(() => createPost('!!!', { directory }), /letter or number/)
})

test('plain Markdown supports prose, tables and footnotes without interpreting JSX', async () => {
  const { createElement } = await import('react')
  const { renderToStaticMarkup } = await import('react-dom/server')
  const { default: Markdown } = await import('react-markdown')
  const { default: remarkGfm } = await import('remark-gfm')
  const html = renderToStaticMarkup(
    createElement(Markdown, {
      remarkPlugins: [remarkGfm],
      children:
        'Text with {braces} and 2 < 3.[^note]\n\n| Idea | Value |\n| --- | --- |\n| Quiet | 1 |\n\n[^note]: A qualification.\n\n<script>alert(1)</script>',
    }),
  )
  assert.match(html, /\{braces\}/)
  assert.match(html, /2 &lt; 3/)
  assert.match(html, /<table>/)
  assert.match(html, /data-footnote-ref/)
  assert.match(html, /data-footnote-backref/)
  assert.doesNotMatch(html, /<script>/)
})
