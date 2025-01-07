// schemas/newsletter.ts
import { defineField, defineType } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'

export const newsletter = defineType({
  name: 'newsletter',
  title: 'Newsletter Issues',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'subscribers',
      title: 'Subscribers',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      publishedAt: 'publishedAt',
    },
    prepare({ title, media, publishedAt }) {
      return {
        title,
        subtitle: new Date(publishedAt).toLocaleDateString(),
        media,
      }
    },
  },
})