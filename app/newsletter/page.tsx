// app/newsletter/page.tsx
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import NewsletterPageClient from './NewsletterPageClient'


async function getNewsletters() {
  const query = groq`
    *[_type == "newsletter"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      coverImage,
      description
    }
  `
  return client.fetch(query)
}

export default async function NewsletterPage() {
  const newsletters = await getNewsletters()
  return <NewsletterPageClient newsletters={newsletters} />
}