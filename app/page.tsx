// app/page.tsx
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import HomePage from './HomePage'
import { format } from 'date-fns'

async function getHomeData() {
  const query = groq`{
    "featured": *[_type == "featured"][0] {
    title,
    description,
    url,
    image,
  },
    "testimonials": *[_type == "testimonial"] | order(_createdAt desc),
    "videos": *[_type == "video"] | order(_createdAt desc)[0...3],
    "posts": *[_type == "post"] | order(createdAt desc)[0...3] {
      _id,
      title,
      createdAt,
      slug
    }
  }`
  
  const data = await client.fetch(query)
  
  // Format the posts data
  return {
    ...data,
    posts: data.posts.map((post: any) => ({
      ...post,
      date: format(new Date(post.createdAt), 'MMM yyyy'),
    }))
  }
}

export default async function Page() {
  const data = await getHomeData()
  return <HomePage data={data} />
}