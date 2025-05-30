const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export const siteConfig = {
  name: 'NammaNagar',
  description: 'A civic engagement platform for better community governance',
  url: baseUrl,
  metadataBase: new URL(baseUrl)
}