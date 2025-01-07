// app/blog/page.tsx
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import BlogPageClient from './BlogPageClient'

// Add console.log to debug data fetching
async function getPosts() {
  const query = groq`
    *[_type == "post"] | order(createdAt desc) {
      _id,
      title,
      subtitle,
      slug,
      mainImage,
      author->,
      bodyContent,
      createdAt,
      category,
      "estimatedReadingTime": round(length(pt::text(bodyContent)) / 5 / 180)
    }
  `
  
  const posts = await client.fetch(query)
  console.log('Fetched posts:', posts) // Debug log
  return posts
}

export default async function BlogPage() {
  const posts = await getPosts()
  
  return <BlogPageClient posts={posts} />
}
