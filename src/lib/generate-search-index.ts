import fs from 'fs';
import path from 'path';
import { getAllEssays } from './mdx';

async function generateSearchIndex() {
  // Get all essays
  const essays = await getAllEssays();
  
  // Convert essays to search results
  const searchResults = essays.map((essay) => ({
    title: essay.frontmatter.title,
    description: essay.frontmatter.description,
    slug: `/essays/${essay.slug}`,
    type: 'essay' as const,
    icon: '📝',
    keywords: essay.frontmatter.tags,
  }));

  // Write the search index to public directory
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  fs.writeFileSync(
    path.join(publicDir, 'search-index.json'),
    JSON.stringify(searchResults, null, 2)
  );

  console.log('Search index generated successfully!');
}

generateSearchIndex().catch(console.error); 