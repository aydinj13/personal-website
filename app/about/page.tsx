// app/about/page.tsx
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import AboutPageClient from './AboutPageClient'

const aboutQuery = groq`{
 "profile": *[_type == "profile"][0] {
   name,
   title, 
   bio,
   image,
   resumeURL,
   socialLinks
 },
 "experience": *[_type == "experience"] | order(order asc) {
   role,
   company,
   startDate,
   endDate,
   isCurrentRole,
   description
 },
 "education": *[_type == "education"] | order(order asc) {
   degree,
   school,
   year,
   grades
 },
 "achievements": *[_type == "achievement"] | order(order asc) {
   title,
   description,
   date
 }
}`

async function getAboutData() {
 try {
   const data = await client.fetch(aboutQuery, {}, {
     next: {
       revalidate: 60 // Revalidate every minute
     }
   })
   return data
 } catch (error) {
   console.error('Error fetching about data:', error)
   return {}
 }
}

export default async function AboutPage() {
 const data = await getAboutData()
 return <AboutPageClient data={data} />
}

// Add revalidation
export const revalidate = 60