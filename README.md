# sundli.ai

My personal website at [sundli.ai](https://sundli.ai)

## Development

```bash
npm install
npm run dev     # typically localhost:3000
```

## Adding Content

### Essays
Essays are stored as MDX files in `src/content/essays`:

```mdx
---
title: Essay Title
date: YYYY-MM-DD
description: Brief description
tags: ["tag1", "tag2"]
---

Content in markdown
```

The URL slug is automatically generated from the filename (e.g., `my-essay.mdx` → `/essays/my-essay`).

### Projects
Projects are currently hardcoded in `src/app/projects/page.tsx`. Edit the component directly to add or modify projects.

## Copyright

© Kelvin Sundli 2025
