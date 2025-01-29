import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Build search index
function buildSearchIndex() {
  const essaysDirectory = path.join(process.cwd(), 'src/content/essays')
  const essayFiles = fs.readdirSync(essaysDirectory)
  
  const searchResults = []

  // Index essays
  for (const filename of essayFiles) {
    if (!filename.endsWith('.mdx')) continue
    
    const filePath = path.join(essaysDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContents)
    
    searchResults.push({
      title: data.title || filename.replace('.mdx', ''),
      description: data.description || '',
      slug: `/essays/${filename.replace('.mdx', '')}`,
      type: 'essay',
      icon: '📝',
      keywords: data.tags || []
    })
  }

  return searchResults
}

// Generate the search index
const searchIndex = buildSearchIndex()
const searchIndexJson = JSON.stringify(searchIndex, null, 2)

// Write to public directory (for development)
const publicDir = path.join(process.cwd(), 'public')
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir)
}
fs.writeFileSync(path.join(publicDir, 'search-index.json'), searchIndexJson)

// Write to out directory (for production build)
const outDir = path.join(process.cwd(), 'out')
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir)
}
fs.writeFileSync(path.join(outDir, 'search-index.json'), searchIndexJson) 