import { defineField, defineType } from 'sanity'

export const venture = defineType({
  name: 'venture',
  title: 'Ventures',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string'
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'link',
      title: 'External Link',
      type: 'url',
      description: 'Optional external link to the venture'
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'In Development', value: 'development' },
          { title: 'Exited', value: 'exited' }
        ]
      }
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'SaaS', value: 'saas' },
          { title: 'E-commerce', value: 'ecommerce' },
          { title: 'Mobile App', value: 'mobile' },
          { title: 'AI/ML', value: 'ai' },
          { title: 'Web3', value: 'web3' },
          { title: 'Investment', value: 'investment' }
        ]
      }
    }),
    defineField({
      name: 'bodyContent',
      title: 'Body Content',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          options: { hotspot: true }
        }
      ]
    }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'metrics',
      title: 'Key Metrics',
      type: 'object',
      fields: [
        { name: 'users', type: 'number', title: 'Active Users' },
        { name: 'revenue', type: 'string', title: 'Revenue' },
        { name: 'growth', type: 'string', title: 'Growth Rate' }
      ]
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'subtitle',
      media: 'mainImage'
    }
  }
})