export interface SearchResult {
  title: string
  description: string
  slug: string | null
  type: 'essay' | 'project' | 'navigation' | 'action'
  icon: string
  keywords?: string[]
  action?: () => Promise<string | null> | string | null
}

// Client-side search function
export function searchContent(query: string, content: SearchResult[]): SearchResult[] {
  // If query is empty, return no results
  if (!query.trim()) {
    return [];
  }

  const searchTerms = query.toLowerCase().trim().split(/\s+/);
  
  // Score each item based on match quality
  const scoredResults = content.map(item => {
    const title = item.title.toLowerCase();
    const description = item.description.toLowerCase();
    const keywords = item.keywords?.join(' ').toLowerCase() || '';
    let score = 0;

    for (const term of searchTerms) {
      // Title matches
      if (title.includes(term)) {
        score += 3;
        // Bonus for word boundary matches in title
        if (title.includes(` ${term}`) || title.startsWith(term)) {
          score += 2;
        }
      }

      // Keyword matches
      if (keywords.includes(term)) {
        score += 2;
        // Bonus for exact keyword match
        if (keywords.split(/\s+/).includes(term)) {
          score += 1;
        }
      }

      // Description matches
      if (description.includes(term)) {
        score += 1;
        // Bonus for word boundary matches in description
        if (description.includes(` ${term}`) || description.startsWith(term)) {
          score += 0.5;
        }
      }
    }

    return { item, score };
  });

  // Filter out items with no matches and sort by score
  return scoredResults
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
} 