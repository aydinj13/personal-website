// app/ventures/[slug]/page.tsx
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import VenturePage from './VenturePage'

async function getVenture(slug: string) {
  const query = groq`
    *[_type == "venture" && slug.current == $slug][0] {
      _id,
      name,
      subtitle,
      bodyContent,
      mainImage,
      link,
      status,
      categories,
      techStack,
      metrics,
      _createdAt
    }
  `
  return client.fetch(query, { slug })
}

export default async function Page({ params }: { params: { slug: string } }) {
  const venture = await getVenture(params.slug)
  return <VenturePage venture={venture} />
}
