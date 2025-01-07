/* eslint-disable @typescript-eslint/no-explicit-any */
// app/blog/[slug]/page.tsx
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import BlogPostPageClient from './BlogPostPageClient'

// Define the Post type for better type safety
interface Post {
  _id: string
  title: string
  subtitle?: string
  mainImage: any
  bodyContent: any
  createdAt: string
  category: string
  estimatedReadingTime: number
  author: any
  relatedPosts: Array<{
    _id: string
    title: string
    slug: { current: string }
    mainImage: any
    createdAt: string
  }>
}

async function getPost(slug: string): Promise<Post | null> {
  const query = groq`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      subtitle,
      mainImage,
      bodyContent,
      createdAt,
      category,
      "estimatedReadingTime": round(length(pt::text(bodyContent)) / 5 / 180),
      author->,
      "relatedPosts": *[_type == "post" && category == ^.category && slug.current != $slug] | order(createdAt desc) [0...3] {
        _id,
        title,
        slug,
        mainImage,
        createdAt
      }
    }
  `
  
  try {
    return await client.fetch(query, { slug })
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

// Define correct props type for Next.js page component
interface PageProps {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function BlogPostPage({ params }: PageProps) {
  try {
    const post = await getPost(params.slug)

    if (!post) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <h1 className="text-2xl font-bold">Post not found</h1>
        </div>
      )
    }

    return <BlogPostPageClient post={post} />
  } catch (error) {
    console.error('Error rendering blog post:', error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Error loading post</h1>
      </div>
    )
  }
}