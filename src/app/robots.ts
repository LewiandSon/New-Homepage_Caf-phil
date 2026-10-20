import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/absage', '/studio'],
    },
    sitemap: 'https://www.cafephil.at/sitemap.xml',
  }
}
