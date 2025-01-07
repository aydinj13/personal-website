"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink } from "lucide-react"
import urlForImage from '@/sanity/lib/urlForImage'
import { PortableText } from '@portabletext/react'

export default function VenturePage({ venture }) {
  if (!venture) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] w-full">
        {venture.mainImage ? (
          <>
            <img
              src={urlForImage(venture.mainImage).url()}
              alt={venture.name}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </>
        ) : (
          <div className="bg-gray-200 w-full h-full" />
        )}

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="container mx-auto px-4 space-y-4 text-center">
            {venture.status && (
              <span className={`px-4 py-1 rounded-full text-sm font-medium 
                ${venture.status === 'active' ? 'bg-green-500' : 
                  venture.status === 'development' ? 'bg-yellow-500' : 
                  'bg-blue-500'}`}
              >
                {venture.status}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-bold">{venture.name}</h1>
            {venture.subtitle && (
              <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
                {venture.subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-8">
            <Link href="/ventures">
              <Button variant="ghost">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Ventures
              </Button>
            </Link>
            {venture.link && (
              <Button asChild>
                <a 
                  href={venture.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  Visit Project
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
          </div>

          {/* Metrics */}
          {venture.metrics && (
            <div className="grid grid-cols-3 gap-6 mb-12">
              {venture.metrics.users && (
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <div className="text-3xl font-bold">{venture.metrics.users}+</div>
                  <div className="text-gray-600">Active Users</div>
                </div>
              )}
              {venture.metrics.revenue && (
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <div className="text-3xl font-bold">{venture.metrics.revenue}</div>
                  <div className="text-gray-600">Revenue</div>
                </div>
              )}
              {venture.metrics.growth && (
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <div className="text-3xl font-bold">{venture.metrics.growth}</div>
                  <div className="text-gray-600">Growth Rate</div>
                </div>
              )}
            </div>
          )}

          {/* Tech Stack */}
          {venture.techStack && venture.techStack.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {venture.techStack.map((tech, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-white rounded-lg shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="prose prose-lg max-w-none">
            <PortableText value={venture.bodyContent} />
          </div>

          {/* Categories */}
          {venture.categories && venture.categories.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <div className="flex flex-wrap gap-2">
                {venture.categories.map((category, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}