/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BookOpen,
  Coffee,
  Eye,
  Instagram,
  Mic,
  Star,
  Twitter,
  Youtube,
} from "lucide-react";
import urlForImage from "@/sanity/lib/urlForImage";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

interface HomePageProps {
  data: {
    testimonials: any[];
    videos: any[];
    posts: any[];
    featured: any[];
  };
}

const HomePage = ({ data }: HomePageProps) => {
  const { testimonials, videos, posts } = data;
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Replace 'YOUR_SUBSTACK_URL' with your actual Substack publication URL
      const substackUrl = "https://thesundaydigest.substack.com/";
      window.location.href = `${substackUrl}?email=${encodeURIComponent(email)}`;
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const companies = [
    "TechCrunch",
    "Forbes",
    "Wired",
    "The Verge",
    "MIT Tech Review",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content Side */}
          <div className="space-y-4 md:space-y-6 order-2 md:order-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Hey, I&apos;m Aydin Joshi
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-600">
              I provide web services for businesses and clients.
            </p>
            <Button
              size="lg"
              className="text-base md:text-lg flex items-center"
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </div>

          {/* Image Side */}
          <div className="relative order-1 md:order-2 flex items-center justify-center mt-8 md:mt-0">
            <div className="h-80 w-80 overflow-hidden rounded-full bg-white ring-4 ring-gray-100">
              <Image
                src="/hero.jpeg"
                alt="Aydin Joshi"
                width={320}
                height={320}
                className="w-full h-full object-cover object-center"
                priority
              />
            </div>
          </div>
        </div>
      </section>
      {/* 
      <section className="bg-gradient-to-b from-gray-50 to-white py-24">
  <div className="container mx-auto px-4">
    <div className="grid lg:grid-cols-2 gap-12 items-center">

      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Featured in Top Tech Publications
          </h2>
          <p className="text-lg text-gray-600">
            My work and insights have been featured in leading technology publications
            and platforms, reaching millions of developers worldwide.
          </p>
        </div>


        <div className="grid grid-cols-3 gap-8">
          {featured.image.map((logo, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              {logo && (
                <Image
                  src={urlForImage(logo).url()}
                  alt="Featured Logo"
                  className="max-h-8 w-auto grayscale hover:grayscale-0 transition-all"
                />
              )}
            </div>
          ))}
        </div>


        <div className="grid grid-cols-3 gap-8 pt-4">
          <div>
            <div className="text-2xl font-bold text-gray-900">50K+</div>
            <div className="text-sm text-gray-600">Monthly Views</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">100+</div>
            <div className="text-sm text-gray-600">Articles Published</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">25+</div>
            <div className="text-sm text-gray-600">Video Tutorials</div>
          </div>
        </div>
      </div>


      <div className="relative">

        <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl bg-gray-900">

          <iframe
            src={featured?.videoUrl?.replace('watch?v=', 'embed/')}
            title="Featured Video"
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          

          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
          <div className="absolute -left-4 -top-4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
        </div>

        <div className="absolute -bottom-6 left-6 right-6">
          <div className="bg-white rounded-lg shadow-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-1">
              {featured.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {featured.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>*/}

      {/* Newsletter Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl font-bold">Subscribe to My Newsletter</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join 50,000+ developers getting weekly insights on web development,
            tech trends, and best practices.
          </p>
          <div className="flex justify-center">
            <form
              onSubmit={handleSubmit}
              className="flex gap-2 w-full max-w-md"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mt-12 opacity-50">
            {companies.map((company) => (
              <div key={company} className="text-xl font-bold">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          What People Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial._id}>
              <CardContent className="pt-6 space-y-4">
                <div className="flex gap-1">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600">{testimonial.content}</p>
                <div className="flex items-center gap-4">
                  {testimonial.image && (
                    <Image
                      src={urlForImage(testimonial.image).url()}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Podcast Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">The Dev Discussion Podcast</h2>
              <p className="text-xl text-gray-600">
                Weekly conversations with top developers about building better
                software. Available on Spotify, Apple Podcasts, and Google
                Podcasts.
              </p>
              <Button size="lg">
                <Mic className="mr-2" />
                Listen Now
              </Button>
            </div>
            <div className="relative h-64">
              <Image
                src="/podcast.jpg"
                alt="Podcast Cover"
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Latest Videos</h2>
            <Button
              variant="outline"
              size="lg"
              className="hidden md:flex items-center"
            >
              <Youtube className="mr-2 h-5 w-5" />
              View Channel
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div
                key={video._id}
                className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* image Container */}
                <div className="relative aspect-video overflow-hidden rounded-t-xl">
                  {video.image ? (
                    <Image
                      src={urlForImage(video.image).url()}
                      alt={video.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <Youtube className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                      <Link href={video.link}>
                        <Youtube className="h-6 w-6 text-black" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-xl line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {video.name}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    {video.views && (
                      <>
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {video.views}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                      </>
                    )}
                    <span>{video._createdAt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Channel Button */}
          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Youtube className="mr-2 h-5 w-5" />
              View Channel
            </Button>
          </div>
        </div>
      </section>

      {/* Buy Me a Coffee Section */}
      <section className="bg-white py-20 text-center">
        <div className="container mx-auto px-4 max-w-2xl space-y-6">
          <Coffee className="w-16 h-16 mx-auto text-yellow-500" />
          <h2 className="text-3xl font-bold">Support My Work</h2>
          <p className="text-xl text-gray-600">
            If you find my content or services helpful, consider buying me a
            coffee. Your support helps me develop more applications.
          </p>
          <Button
            size="lg"
            className="bg-yellow-500 hover:bg-yellow-600"
            asChild
          >
            <Link href="https://buymeacoffee.com/aydinjoshi" target="_blank">
              Buy Me a Coffee
            </Link>
          </Button>
        </div>
      </section>

      {/* Book and Writing Section */}

      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">My New Book</h2>
            <p className="text-xl text-gray-600">
              Modern Web Development: A Comprehensive Guide - Everything you
              need to know about building modern web applications.
            </p>
            <Button size="lg">
              <BookOpen className="mr-2" />
              Get the Book
            </Button>
          </div>
          <div className="relative h-96">
            <Image
              src="/book.jpg"
              alt="Book Cover"
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-8">Recent posts</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="block"
            >
              <Card className="transition-all hover:shadow-lg">
                <CardContent className="pt-6">
                  <h4 className="font-bold text-xl mb-2 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h4>
                  <div className="flex gap-4 text-gray-600">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Social Media Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl font-bold">Connect With Me</h2>
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full"
              asChild
            >
              <Link href="https://x.com/aydinjoshi">
                <Twitter className="h-6 w-6" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full"
              asChild
            >
              <Link href="https://www.instagram.com/aydinjoshi.siu/">
                <Instagram className="h-6 w-6" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full"
              asChild
            >
              <Link href="https://www.youtube.com/@balleraydin/">
                <Youtube className="h-6 w-6" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
