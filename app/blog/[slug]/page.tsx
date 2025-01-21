// app/blog/[slug]/page.tsx
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import BlogPostPageClient from "./BlogPostPageClient";

type Params = Promise<{ slug: string[] }>;

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
  return client.fetch(postQuery, { slug }, {
    next: {
      revalidate: 60 // Revalidate every minute
    }
  });
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPost(slug[0]);

  return <BlogPostPageClient post={post} />;
}

// Add revalidation
export const revalidate = 60;