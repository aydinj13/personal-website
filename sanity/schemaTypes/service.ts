import { defineField, defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Globe', value: 'globe' },
          { title: 'Database', value: 'database' },
          { title: 'Smartphone', value: 'smartphone' },
          { title: 'Palette', value: 'palette' },
          { title: 'Share', value: 'share' },
          { title: 'Package', value: 'package' },
          { title: 'GraduationCap', value: 'graduationCap' },
        ],
      },
    }),
    defineField({
      name: 'startingPrice',
      title: 'Starting Price',
      type: 'string',
    }),
    defineField({
      name: 'highlighted',
      title: 'Highlighted',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
})
