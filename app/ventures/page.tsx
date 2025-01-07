// app/ventures/page.tsx
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import VenturesPage from './VenturesPage'

async function getVentures() {
  const query = groq`{
    "ventures": *[_type == "venture"] | order(_createdAt desc) {
      _id,
      name,
      subtitle,
      "bodyContent": pt::text(bodyContent),
      mainImage,
      link,
      "slug": slug.current,
      featured,
      status,
      categories,
      techStack,
      metrics,
      _createdAt
    }
  }`
  
  return client.fetch(query)
}

export default async function Page() {
  const data = await getVentures()
  return <VenturesPage ventures={data.ventures} />
}