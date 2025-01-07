// app/services/page.tsx
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import ServicesPageClient from './ServicesPageClient'

async function getServicesData() {
  const query = groq`{
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

  return client.fetch(query)
}

export default async function ServicesPage() {
  const data = await getServicesData()
  return <ServicesPageClient {...data} />
}