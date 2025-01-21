// app/ventures/page.tsx
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import VenturesPage from './VenturesPage'

const venturesQuery = groq`{
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

async function getVentures() {
 try {
   const data = await client.fetch(venturesQuery, {}, {
     next: {
       revalidate: 60,
       tags: ['ventures']
     }
   })
   return data
 } catch (error) {
   console.error('Error fetching ventures:', error)
   return {
     ventures: []
   }
 }
}

export default async function Page() {
 const data = await getVentures()
 return <VenturesPage ventures={data.ventures} />
}

// Add revalidation
export const revalidate = 60