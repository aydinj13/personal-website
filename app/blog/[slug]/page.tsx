import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import BlogPostPageClient from './BlogPostPageClient'

async function getPost(slug: string) {
  const query = groq`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      slug,
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

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params
  const post = await getPost(slug)

  if (!post) {
    return <p>Post not found</p> // Handle the case when the post isn't found
  }

  return <BlogPostPageClient post={post} />
}
