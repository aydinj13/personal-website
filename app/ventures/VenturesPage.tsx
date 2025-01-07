/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import urlForImage from '@/sanity/lib/urlForImage'

interface Venture {
  _id: string
  name: string
  subtitle?: string
  bodyContent?: string
  mainImage?: any
  link?: string
  slug: string
  featured?: boolean
  status?: string
  categories?: string[]
  techStack?: string[]
  metrics?: {
    users?: number
    revenue?: string
    growth?: string
  }
  _createdAt: string
}

interface VenturesPageProps {
  ventures: Venture[]
}

export default function VenturesPage({ ventures }: VenturesPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">My Ventures</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore the SaaS, startups, and investments I&apos;m passionate about.
          </p>
          <Link href="/contact">
            <Button size="lg" className="mt-6">Contact Me</Button>
          </Link>
        </div>
      </section>

      {/* Ventures Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ventures.map((venture) => (
            <Link 
              key={venture._id} 
              href={venture.link || `/ventures/${venture.slug}`}
              className="block group"
            >
              <article className="h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                {/* Image Container */}
                <div className="aspect-video relative overflow-hidden">
                  {venture.mainImage ? (
                    <img
                      src={urlForImage(venture.mainImage).url()}
                      alt={venture.name}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">No image available</span>
                    </div>
                  )}
                  {/* Status Badge */}
                  {venture.status && (
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium 
                        ${venture.status === 'active' ? 'bg-green-100 text-green-800' : 
                          venture.status === 'development' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-blue-100 text-blue-800'}`}
                      >
                        {venture.status}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col h-full">
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {venture.name}
                  </h2>
                  {venture.subtitle && (
                    <p className="text-gray-600 mb-4">{venture.subtitle}</p>
                  )}
                  
                  {/* Categories */}
                  {venture.categories && venture.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {venture.categories.map((category, index) => (
                        <span 
                          key={index}
                          className="text-xs px-2 py-1 bg-gray-100 rounded-full"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* Investment Group Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-bold">Investment Group</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover my involvement in collaborative investment opportunities.
          </p>
          <Link href="/investment-group">
            <Button variant="outline" size="lg" className="mt-6">
              Learn More
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}