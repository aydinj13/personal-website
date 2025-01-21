// app/newsletter/page.tsx
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import NewsletterPageClient from './NewsletterPageClient'

const newsletterQuery = groq`
  *[_type == "newsletter"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    coverImage,
    description
  }
`

async function getNewsletters() {
  try {
    const newsletters = await client.fetch(newsletterQuery, {}, {
      next: {
        revalidate: 60, // Revalidate every minute
        tags: ['newsletters'] // Tag for revalidation
      }
    })
    return newsletters
  } catch (error) {
    console.error('Error fetching newsletters:', error)
    return []
  }
}

export default async function NewsletterPage() {
  const newsletters = await getNewsletters()
  return <NewsletterPageClient newsletters={newsletters} />
}

// Add revalidation
export const revalidate = 60