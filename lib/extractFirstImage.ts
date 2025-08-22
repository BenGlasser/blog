/**
 * Extracts the first image from blog post content
 * Looks for markdown images ![](url) and HTML img tags
 */
export function extractFirstImage(content: string): string | null {
  if (!content) return null

  // Match markdown image syntax: ![alt](url) or ![alt](url "title")
  const markdownImageRegex = /!\[.*?\]\(([^)\s]+)(?:\s+"[^"]*")?\)/
  const markdownMatch = content.match(markdownImageRegex)

  if (markdownMatch && markdownMatch[1]) {
    return markdownMatch[1]
  }

  // Match HTML img tags: <img src="url" ... />
  const htmlImageRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/i
  const htmlMatch = content.match(htmlImageRegex)

  if (htmlMatch && htmlMatch[1]) {
    return htmlMatch[1]
  }

  return null
}

/**
 * Processes an image URL to ensure it's absolute
 */
export function processImageUrl(imageUrl: string, siteUrl: string): string {
  if (!imageUrl) return ''

  // If the URL already includes http/https, return as is
  if (imageUrl.includes('http')) {
    return imageUrl
  }

  // If it starts with a slash, it's relative to the site root
  if (imageUrl.startsWith('/')) {
    return siteUrl + imageUrl
  }

  // Otherwise, assume it's relative to the site root and add leading slash
  return siteUrl + '/' + imageUrl
}
