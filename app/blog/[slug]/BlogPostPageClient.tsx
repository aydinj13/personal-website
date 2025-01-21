'use client';

import { PortableText } from '@portabletext/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ChevronLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RichTextComponents } from '@/components/RichTextComponents';
import urlForImage from '@/sanity/lib/urlForImage';
import type { PortableTextBlock, Image as SanityImage } from 'sanity';

interface Author {
  _type: 'author';
  _id: string;
  name: string;
  image?: SanityImage;
  bio?: PortableTextBlock[];
}

interface RelatedPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage?: SanityImage;
  createdAt: string;
}

interface Post {
  _id: string;
  title: string;
  subtitle?: string;
  category?: string;
  mainImage?: SanityImage;
  author?: Author;
  createdAt: string;
  estimatedReadingTime?: number;
  bodyContent?: PortableTextBlock[];
  relatedPosts?: RelatedPost[];
}

interface BlogPostPageClientProps {
  post: Post;
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export default function BlogPostPageClient({ post }: BlogPostPageClientProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / documentHeight) * 100;
      setProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-blue-600 transition-all duration-300 z-50"
        style={{ width: `${progress}%` }}
      />

      {/* Hero section */}
      <div className="relative h-[70vh] min-h-[600px] bg-gray-900">
        {post.mainImage && (
          <div className="absolute inset-0">
            <Image
              src={urlForImage(post.mainImage).url()}
              alt={post.title}
              className="w-full h-full object-cover opacity-40"
              width={1920}
              height={1080}
              priority
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80" />
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-16 relative">
          <Link
            href="/blog"
            className="text-white/80 hover:text-white flex items-center gap-2 mb-8 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Blog
          </Link>
          <div className="max-w-3xl">
            {post.category && (
              <Badge variant="secondary" className="mb-4">
                {post.category}
              </Badge>
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>
            {post.subtitle && (
              <p className="text-xl text-white/80 mb-6">{post.subtitle}</p>
            )}
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              {post.author && (
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={post.author.image ? urlForImage(post.author.image).url() : undefined}
                      alt={post.author.name}
                    />
                    <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <span>{post.author.name}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(post.createdAt)}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.estimatedReadingTime || 5} min read
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <article className="prose prose-lg max-w-none">
            {post.bodyContent && (
              <PortableText
                value={post.bodyContent}
                components={RichTextComponents}
              />
            )}
          </article>

          {/* Author bio */}
          {post.author?.bio && (
            <div className="mt-16 pt-8 border-t">
              <h2 className="text-2xl font-bold mb-6">About the Author</h2>
              <Card>
                <CardContent className="flex flex-col sm:flex-row gap-6 p-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src={post.author.image ? urlForImage(post.author.image).url() : undefined}
                      alt={post.author.name}
                    />
                    <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {post.author.name}
                    </h3>
                    <div className="text-gray-700">
                      <PortableText
                        value={post.author.bio}
                        components={RichTextComponents}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Related posts */}
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <div className="mt-16 pt-8 border-t">
            <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {post.relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost._id}
                  href={`/blog/${relatedPost.slug.current}`}
                  className="group"
                >
                  <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                    <div className="aspect-video relative">
                      {relatedPost.mainImage ? (
                        <Image
                          src={urlForImage(relatedPost.mainImage).url()}
                          alt={relatedPost.title}
                          width={600}
                          height={338}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold group-hover:text-blue-600 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <time className="text-sm text-gray-500">
                        {formatDate(relatedPost.createdAt)}
                      </time>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}