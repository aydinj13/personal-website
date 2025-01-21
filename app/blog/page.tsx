// app/blog/page.tsx
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import BlogPageClient from './BlogPageClient'

const postsQuery = groq`
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

async function getPosts() {
  try {
    const posts = await client.fetch(postsQuery, {}, {
      next: {
        revalidate: 60, // Revalidate every minute
        tags: ['posts'] // Tag for revalidation
      }
    })
    console.log('Fetched posts:', posts) // Debug log
    return posts
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getPosts()
  return <BlogPageClient posts={posts} />
}

// Add revalidation
export const revalidate = 60