import { defineType, defineField } from 'sanity'

export const featured = defineType({
  name: 'featured',
  title: 'Featured Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text'
    }),
    defineField({
      name: 'url',
      title: 'YouTube Video URL',
      type: 'url'
    }),
    defineField({
      name: 'image',
      title: 'Thumbnail',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true }
        }
      ]
    })
  ]
})
