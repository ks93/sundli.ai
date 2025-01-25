import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Essay {
  content: string;
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    description: string;
    tags: string[];
  };
}

const ESSAYS_PATH = path.join(process.cwd(), 'src/content/essays');

export async function getAllEssays(): Promise<Essay[]> {
  const files = fs.readdirSync(ESSAYS_PATH);

  const essays = files.map((fileName) => {
    const slug = fileName.replace('.mdx', '');
    const fullPath = path.join(ESSAYS_PATH, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data: frontmatter, content } = matter(fileContents);

    return {
      slug,
      frontmatter,
      content,
    } as Essay;
  });

  return essays;
}

export async function getEssayBySlug(slug: string): Promise<Essay | null> {
  try {
    const fullPath = path.join(ESSAYS_PATH, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data: frontmatter, content } = matter(fileContents);

    return {
      slug,
      frontmatter,
      content,
    } as Essay;
  } catch {
    return null;
  }
} 