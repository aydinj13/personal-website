/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { 
  Card, 
  CardContent, 
  CardDescription,
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Globe,
  Database,
  Smartphone,
  Palette,
  Share2,
  Package,
  GraduationCap,
  Star,
  ArrowRight,
} from "lucide-react"
import urlForImage from '@/sanity/lib/urlForImage'
import Link from "next/link"
import { ReactPortal } from "react"
import { ReactNode } from "react"
import { JSXElementConstructor, ReactElement } from "react"
import { Key } from "react"


const iconMap: { [key: string]: any } = {
  globe: Globe,
  database: Database,
  smartphone: Smartphone,
  palette: Palette,
  share: Share2,
  package: Package,
  graduationCap: GraduationCap,
}


export default function ServicesPageClient({ services, featuredProjects, testimonials }: { services: any, featuredProjects: any, testimonials: any }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">Professional Development Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From simple websites to complex SaaS applications, I bring your digital vision to life.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service: any) => {
              const IconComponent = iconMap[service.icon as keyof typeof iconMap]
            return (
              <Card 
                key={service._id}
                className={`relative ${
                  service.highlighted ? 'border-blue-500 border-2' : ''
                }`}
              >
                {service.highlighted && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <div className="mb-4">
                    {IconComponent && <IconComponent className="h-6 w-6" />}
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">
                    Starting at ${service.startingPrice} USD
                  </p>
                </CardContent>
                <CardFooter className="flex gap-4">
                <Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">View Details</Button>
  </DialogTrigger>
  <DialogContent className="max-w-4xl">
    <DialogHeader>
      <DialogTitle className="text-2xl font-bold">
        {service.title}
      </DialogTitle>
      <p className="text-gray-600 mt-2">{service.description}</p>
    </DialogHeader>
    
    <div className="mt-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Portfolio Projects</h3>
        <p className="text-blue-600 font-semibold">
          Starting at ${service.startingPrice} USD
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {service.portfolio?.map((item: any, index: number) => (
          <Card key={index} className="overflow-hidden">
            {item.image && (
              <div className="relative aspect-video">
                <img 
                  src={urlForImage(item.image).url()}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
              </div>
            )}
            <CardContent className="p-4">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h4 className="font-bold text-lg">{item.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                </div>
                <time className="text-sm text-gray-500">
                  {new Date(item.date).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric'
                  })}
                </time>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-end gap-4">
        <DialogClose asChild>
          <Button variant="outline">Close</Button>
        </DialogClose>
        <Button asChild>
          <Link href="/contact">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  </DialogContent>
</Dialog>
                  <Button asChild>
                    <Link href="/contact">
                    Contact Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Featured Projects */}
<section className="bg-white py-20">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredProjects.map((project: any, index: number) => (
        <Card 
          key={index}
          className="group overflow-hidden hover:shadow-lg transition-all duration-300"
        >
          <CardContent className="p-0">
            {/* Image Container */}
            <div className="relative overflow-hidden aspect-video">
              {project.image ? (
                <img 
                  src={urlForImage(project.image).url()}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <Package className="h-12 w-12 text-gray-400" />
                </div>
              )}
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-bold text-xl mb-2 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 line-clamp-2 mb-4">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | Iterable<ReactNode> | null | undefined, i: Key | null | undefined) => (
                  <span 
                    key={i}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Link Button */}
              {project.link && (
                <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button 
                    asChild 
                    className="w-full"
                    variant="outline"
                  >
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      View Project <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Client Testimonials</h2>
        <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial: any, index: number) => (
            <Card key={index}>
              <CardContent className="pt-6 space-y-4">
                <div className="flex gap-1">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600">{testimonial.content}</p>
                <div className="flex items-center gap-4">
                  {testimonial.image && (
                    <img
                      src={urlForImage(testimonial.image).url()}
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
    </div>
  )
}