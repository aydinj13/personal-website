import {defineArrayMember, defineField, defineType} from 'sanity'
import {PackageIcon} from '@sanity/icons'

export const project = defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
    }),
    defineField({
      name: 'service',
      title: 'Service Category',
      type: 'reference',
      to: [{type: 'service'}],
    }),
    defineField({
      name: 'bodyContent',
      title: 'Body Content',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
  ],
})