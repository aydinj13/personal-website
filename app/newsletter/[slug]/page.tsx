// app/newsletter/[slug]/page.tsx
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { PortableText } from '@portabletext/react'
import urlForImage from '@/sanity/lib/urlForImage'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Calendar, Share2 } from 'lucide-react'
import Image from 'next/image'

type Params = Promise<{ slug: string[] }>;

async function getNewsletterIssue(slug: string) {
  const query = groq`
    *[_type == "newsletter" && slug.current == $slug][0] {
      _id,
      title,
      publishedAt,
      coverImage,
      content,
      description,
      "next": *[_type == "newsletter" && publishedAt > ^.publishedAt] | order(publishedAt asc) [0] {
        title,
        slug
      },
      "previous": *[_type == "newsletter" && publishedAt < ^.publishedAt] | order(publishedAt desc) [0] {
        title,
        slug
      }
    }
  `
  return client.fetch(query, { slug })
}

export default async function NewsletterIssuePage({ params }: { params: Params }) {
  const { slug } = await params;
  const issue = await getNewsletterIssue(slug[0])

  return (
    <div className="min-h-screen bg-white">
      {/* Header with image */}
      {issue.coverImage && (
        <div className="relative h-[40vh] min-h-[400px] bg-gray-900">
          <Image
            src={urlForImage(issue.coverImage).url()}
            alt={issue.title}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
        </div>
      )}

      <div className="container mx-auto px-4">
        {/* Navigation */}
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center py-6">
            <Link href="/newsletter">
              <Button variant="ghost" className="hover:bg-gray-100">
                <ChevronLeft className="mr-2 h-4 w-4" /> Back to Newsletter
              </Button>
            </Link>
            <Button variant="ghost" className="hover:bg-gray-100">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <article className={`max-w-4xl mx-auto ${issue.coverImage ? '-mt-32 relative' : ''}`}>
          <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {issue.title}
              </h1>
              {issue.description && (
                <p className="text-xl text-gray-600 mb-6">
                  {issue.description}
                </p>
              )}
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar className="h-4 w-4" />
                <time>
                  {new Date(issue.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </header>

            <div className="prose prose-lg max-w-none">
              <PortableText 
                value={issue.content}
              />
            </div>
          </div>

          {/* Previous/Next Navigation */}
          <div className="mt-12 flex justify-between items-center">
            {issue.previous && (
              <Link href={`/newsletter/${issue.previous.slug.current}`}>
                <Button variant="ghost" className="hover:bg-gray-100">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  {issue.previous.title}
                </Button>
              </Link>
            )}
            {issue.next && (
              <Link href={`/newsletter/${issue.next.slug.current}`}>
                <Button variant="ghost" className="hover:bg-gray-100 ml-auto">
                  {issue.next.title}
                  <ChevronLeft className="ml-2 h-4 w-4 rotate-180" />
                </Button>
              </Link>
            )}
          </div>
        </article>
      </div>
    </div>
  )
}