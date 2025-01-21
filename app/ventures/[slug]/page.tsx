// app/ventures/[slug]/page.tsx
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import VenturePage from './VenturePage'

type Params = Promise<{ slug: string[] }>;

const ventureQuery = groq`
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

async function getVenture(slug: string) {
  return client.fetch(ventureQuery, { slug }, {
    next: {
      revalidate: 60 // Revalidate every minute
    }
  })
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const venture = await getVenture(slug[0]);
  return <VenturePage venture={venture} />
}

// Add revalidation
export const revalidate = 60