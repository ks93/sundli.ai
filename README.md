# sundli.ai

Kelvin Sundli's personal site. Next.js, plain Markdown, and a static export to GitHub Pages.

## Write a post

```sh
npm ci
npm run new:post -- "My next idea"
npm run dev
```

Edit the generated file in `src/content/essays/`. Open http://localhost:3000/essays to preview it. Drafts appear locally with a “Draft preview” label.

When ready, set `draft: false`, commit, and merge your PR. GitHub Actions publishes the site from `main`. The homepage, essay index, page URL, and sitemap update automatically. **No component, route, or index edits.**

You can also use GitHub's **Add file → Create new file** in `src/content/essays/`. No local tools are required to publish. Create `my-next-idea.md`:

```markdown
---
title: My next idea
date: '2026-09-20'
---

Start writing in Markdown.
```

Only `title` and `date` are required. Use the actual publication date. Optional fields:

```yaml
description: A short summary for the index and social previews.
draft: true
```

- The filename is the URL: `my-next-idea.md` → `/essays/my-next-idea`. Use lowercase letters, numbers, and hyphens. Keep it stable after publishing.
- Posts are sorted newest first. `date` is a publication label, not a scheduler; use `draft: true` to hold a post back.
- Drafts are included only by `npm run dev`. They are excluded from the production page list, generated routes, and sitemap. Draft files in this **public repository** are still publicly readable on GitHub.
- The generator starts with `draft: true` and refuses to overwrite existing files. Set it to `false` or remove the field to publish.
- A malformed title, date, description, or draft flag fails the build with the filename. Tags are not required or displayed.
- Markdown supports headings, links, images, lists, code fences, tables, and footnotes. No JSX, imports, or raw HTML required; HTML is not rendered.
- Put images in `public/images/` and reference them as `![Descriptive alt text](/images/my-photo.jpg)`.

Footnotes work like this:

```markdown
An idea with one exception.[^exception]

[^exception]: The qualification, with a link back to the text.
```

## Check and preview

```sh
npm run dev          # local preview, including drafts
npm run check        # format, lint, types, content tests, production build
npx serve out        # optional: preview the production export after a build
npm run format       # format changed writing/code before committing
```

PRs run the same checks. The production output is `out/`, ready for GitHub Pages; no application server, database, CMS, or API keys are needed. Node 20 or newer.

## Where things live

- `src/content/essays/*.md` — posts. The existing essay keeps its original URL.
- `src/app/` — homepage, essays, projects, contact, and the existing ASU feedback redirect.
- `src/app/globals.css` — Quiet Exception colors, type, layout, and reading styles.
- `public/brand/` — outlined Manrope wordmarks and the softened asterisk.
- `public/fonts/` — self-hosted Manrope and its OFL license.
- `scripts/new-post.mjs` — the optional post generator.
- `docs/design-system.md` — the design decisions used by the site.

The projects page is intentionally small until there are projects to list. Edit `src/app/projects/page.tsx` when adding one; use a title, description, and ordinary link.

## Copyright

© Kelvin Sundli. Font licensing is in `public/fonts/OFL.txt`.
