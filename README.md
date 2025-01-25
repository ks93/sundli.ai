This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a custom font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deployment

This project is deployed using GitHub Pages. The deployment is automated through GitHub Actions, which builds and deploys the Next.js application whenever changes are pushed to the main branch.

To deploy your own version:
1. Fork this repository
2. Enable GitHub Pages in your repository settings
3. Configure the GitHub Actions workflow for deployment
4. Push changes to the main branch to trigger automatic deployment

## Adding an Essay

To add a new essay to the website, follow these steps:

1. Create a new `.mdx` file in the `src/app/essays/content/` directory.
2. Add the required frontmatter to the top of the file. The frontmatter should include the following fields:
   - `title`: The title of the essay
   - `date`: The date of the essay in `YYYY-MM-DD` format
   - `description`: A brief description of the essay
   - `tags`: An array of tags related to the essay

   Example frontmatter:
   ```mdx
   ---
   title: "Your Essay Title"
   date: "YYYY-MM-DD"
   description: "A brief description of your essay"
   tags: ["tag1", "tag2", "tag3"]
   ---
   ```

3. Write the content of your essay below the frontmatter.

4. As a starting point, you can copy the `example-essay.mdx.txt` file from the `src/app/essays/content/` directory and modify it as needed.

Once you save the file, the new essay will automatically appear in the essays list on the website.
