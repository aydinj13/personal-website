
"use client"

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Calendar, Clock } from 'lucide-react'
import Link from 'next/link'
import urlForImage from '@/sanity/lib/urlForImage'

export default function BlogPageClient({ posts }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Debug log
  console.log('Client received posts:', posts)

  // Get unique categories from posts
  const categories = ["All"]
  posts.forEach(post => {
    if (post.category && !categories.includes(post.category)) {
      categories.push(post.category)
    }
  })

  const categoriesWithCount = categories.map(category => ({
    name: category,
    count: category === "All" 
      ? posts.length 
      : posts.filter(post => post.category === category).length
  }))

  // Filter posts based on search query and selected category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.bodyContent?.some(block => 
        block._type === 'block' && 
        block.children?.some(child => 
          child.text?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      ) || false

    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {categoriesWithCount.map((category) => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "ghost"}
                  className="w-full justify-between"
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.name}
                  <Badge variant="secondary">{category.count}</Badge>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:w-3/4">
          <h1 className="text-3xl font-bold mb-8">Latest Blog Posts</h1>
          {filteredPosts.length === 0 ? (
            <p className="text-gray-500">No posts found.</p>
          ) : (
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <Card key={post._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      {post.mainImage ? (
                        <img
                          src={urlForImage(post.mainImage).url()}
                          alt={post.title}
                          className="h-48 w-full object-cover"
                        />
                      ) : (
                        <div className="h-48 w-full bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        {post.category && (
                          <Badge variant="secondary">{post.category}</Badge>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.createdAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.estimatedReadingTime || 5} min read
                        </div>
                      </div>
                      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                      {post.subtitle && (
                        <p className="text-gray-600 mb-4">{post.subtitle}</p>
                      )}
                      <Link href={`/blog/${post.slug.current}`}>
                        <Button variant="link" className="p-0">Read More →</Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}