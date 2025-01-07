import { defineArrayMember, defineType } from "sanity";
import { defineField } from "sanity";

export const portfolio = defineType({
    name: 'portfolio',
    title: 'Portfolio',
    type: 'document',
    fields: [
      defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
      }),
      defineField({
        name: 'description',
        title: 'Description',
        type: 'text',
      }),
      defineField({
        name: 'date',
        title: 'Date',
        type: 'date',
      }),
      defineField({
        name: 'image',
        title: 'Image',
        type: 'image',
        options: { hotspot: true },
      }),
      defineField({
        name: 'service',
        title: 'Service',
        type: 'reference',
        to: [{ type: 'service' }],
      }),
      defineField({
        name: 'featured',
        title: 'Featured',
        type: 'boolean',
        initialValue: false,
      }),
      defineField({
        name: 'technologies',
        title: 'Technologies',
        type: 'array',
        of: [{ type: 'string' }],
      }),
      defineField({
        name: 'bodyContent',
        title: 'Body Content',
        type: 'array',
        of: [defineArrayMember({type: 'block'})],
      }),
      defineField({
        name: 'link',
        title: 'Link',
        type: 'url',
      }),
    ],
  })