import { SITE_URL } from '@/utils/constants'
import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
        url: SITE_URL,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 1,
    },
    {
        url: `${SITE_URL}/candidates`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
    },
    {
        url: `${SITE_URL}/vaults`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
    },
    {
        url: `${SITE_URL}/history/1`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
    },
    {
        url: `${SITE_URL}/unit/btc`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
    },
  ]
}