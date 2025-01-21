// app/about/page.tsx
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import AboutPageClient from './AboutPageClient'

const aboutQuery = groq`{
  "profile": *[_type == "profile"][0] {
    name,
    title,
    bio,
    image,
    resumeURL,
    socialLinks
  },
  "experience": *[_type == "experience"] | order(order asc) {
    role,
    company,
    startDate,
    endDate,
    isCurrentRole,
    description
  },
  "education": *[_type == "education"] | order(order asc) {
    degree,
    school,
    year,
    grades
  },
  "achievements": *[_type == "achievement"] | order(order asc) {
    title,
    description,
    date
  }
}`

async function getAboutData() {
  try {
    const data = await client.fetch(aboutQuery, {}, {
      next: {
        revalidate: 60
      }
    })

    // Ensure we return an object with all required properties, even if empty
    return {
      profile: data.profile || {
        name: '',
        title: '',
        bio: '',
        image: null,
        resumeURL: '',
        socialLinks: {}
      },
      experience: data.experience || [],
      education: data.education || [],
      achievements: data.achievements || []
    }
  } catch (error) {
    console.error('Error fetching about data:', error)
    // Return default data structure if fetch fails
    return {
      profile: {
        name: '',
        title: '',
        bio: '',
        image: null,
        resumeURL: '',
        socialLinks: {}
      },
      experience: [],
      education: [],
      achievements: []
    }
  }
}

export default async function AboutPage() {
  const data = await getAboutData()
  return <AboutPageClient data={data} />
}

// Add revalidation
export const revalidate = 60