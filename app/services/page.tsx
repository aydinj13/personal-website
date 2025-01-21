// app/services/page.tsx
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import ServicesPageClient from './ServicesPageClient'

const servicesQuery = groq`{
 "services": *[_type == "service"] | order(order asc) {
   _id,
   title,
   id,
   description, 
   icon,
   startingPrice,
   highlighted,
   "portfolio": *[_type == "portfolio" && references(^._id)] {
     title,
     description,
     date,
     image,
     link,
   }
 },
 "featuredProjects": *[_type == "portfolio" && featured == true] {
   title,
   category,
   description,
   image,
   technologies,
   link,
 },
 "testimonials": *[_type == "testimonial"] {
   name,
   role,
   image,
   content,
   stars
 }
}`

async function getServicesData() {
 try {
   const data = await client.fetch(servicesQuery, {}, {
     next: {
       revalidate: 60,
       tags: ['services']
     }
   })
   return data
 } catch (error) {
   console.error('Error fetching services data:', error)
   return {
     services: [],
     featuredProjects: [],
     testimonials: []
   }
 }
}

export default async function ServicesPage() {
 const data = await getServicesData()
 return <ServicesPageClient {...data} />
}

// Add revalidation
export const revalidate = 60