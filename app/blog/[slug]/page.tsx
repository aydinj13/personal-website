/* eslint-disable @typescript-eslint/no-explicit-any */
// app/blog/[slug]/page.tsx
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import BlogPostPageClient from "./BlogPostPageClient";
import { notFound } from 'next/navigation';

// Move query to constant
const postQuery = groq`
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
`;

async function getPost(slug: string) {
  try {
    const post = await client.fetch(postQuery, { slug }, {
      next: {
        revalidate: 60, // Revalidate every minute
        tags: [`post-${slug}`] // Tag for individual post revalidation
      }
    });

    if (!post) {
      return null;
    }

    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostPageClient post={post} />;
}

// Add revalidation
export const revalidate = 60;

// Generate static params for faster builds
export async function generateStaticParams() {
  const query = groq`*[_type == "post"] { slug }`;
  const slugs = await client.fetch(query);
  
  return slugs.map((slug: any) => ({
    slug: slug.current,
  }));
}