import {defineField, defineType} from 'sanity'
import {PlayIcon} from '@sanity/icons'

export const video = defineType({
  name: 'video',
  title: 'Videos',
  type: 'document',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
    }),
    defineField({
      name: 'image',
      title: 'Thumbnail',
      type: 'image',
    }),
    defineField({
      name: 'views',
      title: 'Views',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'link',
      title: 'Video Link',
      type: 'url',
    }),
  ],
})