/* eslint-disable @typescript-eslint/no-explicit-any */
// app/ventures/[slug]/page.tsx
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import VenturePage from './VenturePage'
import { notFound } from 'next/navigation'

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
 try {
   const venture = await client.fetch(ventureQuery, { slug }, {
     next: {
       revalidate: 60,
       tags: [`venture-${slug}`]
     }
   })

   if (!venture) {
     return null
   }

   return venture
 } catch (error) {
   console.error('Error fetching venture:', error)
   return null
 }
}

export default async function Page({ 
 params 
}: { 
 params: { slug: string } 
}) {
 const venture = await getVenture(params.slug)

 if (!venture) {
   notFound()
 }

 return <VenturePage venture={venture} />
}

// Add revalidation
export const revalidate = 60

// Generate static params for better performance
export async function generateStaticParams() {
 const query = groq`*[_type == "venture"] { slug }`;
 const slugs = await client.fetch(query);
 
 return slugs.map((slug: any) => ({
   slug: slug.current,
 }));
}