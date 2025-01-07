/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import BlogPostPageClient from './BlogPostPageClient'

// Define interfaces for the post data structure
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
  return client.fetch(query, { slug })
}

// Update the props interface to match Next.js 13+ page props structure
interface BlogPostPageProps {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params
  const post = await getPost(slug)

  if (!post) {
    return <p>Post not found</p>
  }

  return <BlogPostPageClient post={post} />
}