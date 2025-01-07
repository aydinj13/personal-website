// app/about/AboutPageClient.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Twitter, Download, Mail } from "lucide-react"
import urlForImage from '@/sanity/lib/urlForImage'
import { format } from 'date-fns'

function formatDateRange(startDate: string, endDate?: string, isCurrentRole?: boolean) {
  if (!startDate) return ''
  const start = format(new Date(startDate), 'MMM yyyy')
  const end = isCurrentRole ? 'Present' : endDate ? format(new Date(endDate), 'MMM yyyy') : ''
  return `${start} - ${end}`
}

export default function AboutPageClient({ data = {} }) {
  // Provide default values for all data
  const { 
    profile = {
      name: '',
      title: '',
      bio: '',
      image: null,
      resumeURL: '',
      socialLinks: {}
    },
    experience = [],
    education = [],
    achievements = []
  } = data

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 space-y-12">
        {/* Hero Section */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative h-72 md:h-96">
            {profile?.image ? (
              <img
                src={urlForImage(profile.image).url()}
                alt={profile.name || 'Profile'}
                className="rounded-lg object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <h1 className="text-4xl font-bold">{profile.name || 'Name Not Available'}</h1>
            <p className="text-xl text-gray-600">{profile.bio || 'Bio Not Available'}</p>
            
            <div className="flex gap-4">
              {profile.resumeURL && (
                <Button className="rounded-full" asChild>
                  <a href={profile.resumeURL} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    Download CV
                  </a>
                </Button>
              )}
              
              <div className="flex gap-2">
                {profile.socialLinks?.github && (
                  <Button variant="outline" size="icon" className="rounded-full" asChild>
                    <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-5 w-5" />
                    </a>
                  </Button>
                )}
                {profile.socialLinks?.linkedin && (
                  <Button variant="outline" size="icon" className="rounded-full" asChild>
                    <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </Button>
                )}
                {profile.socialLinks?.twitter && (
                  <Button variant="outline" size="icon" className="rounded-full" asChild>
                    <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-5 w-5" />
                    </a>
                  </Button>
                )}
                {profile.socialLinks?.email && (
                  <Button variant="outline" size="icon" className="rounded-full" asChild>
                    <a href={`mailto:${profile.socialLinks.email}`}>
                      <Mail className="h-5 w-5" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        {experience.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">Experience</h2>
            <div className="grid gap-4">
              {experience.map((exp, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-xl">{exp.role}</h3>
                        <p className="text-gray-600">{exp.company}</p>
                      </div>
                      {exp.startDate && (
                        <Badge variant="secondary">
                          {formatDateRange(exp.startDate, exp.endDate, exp.isCurrentRole)}
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600">{exp.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">Education</h2>
            <div className="grid gap-4">
              {education.map((edu, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-xl">{edu.degree}</h3>
                        <p className="text-gray-600">{edu.school}</p>
                      </div>
                      {edu.year && <Badge variant="secondary">{edu.year}</Badge>}
                    </div>
                    {edu.grades && edu.grades.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {edu.grades.map((grade, idx) => (
                          <div key={idx} className="bg-gray-50 p-3 rounded">
                            <p className="font-medium">{grade.subject}</p>
                            <p className="text-gray-600">{grade.grade}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Achievements Section */}
        {achievements.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">Awards & Achievements</h2>
            <div className="grid gap-4">
              {achievements.map((achievement, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-xl mb-2">{achievement.title}</h3>
                    <p className="text-gray-600">{achievement.description}</p>
                    {achievement.date && (
                      <p className="text-sm text-gray-500 mt-2">
                        {format(new Date(achievement.date), 'MMMM yyyy')}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}