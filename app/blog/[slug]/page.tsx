// app/blog/[slug]/page.tsx
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import BlogPostPageClient from './BlogPostPageClient'

async function getPost(slug: string) {
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

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  
  return <BlogPostPageClient post={post} />
}

