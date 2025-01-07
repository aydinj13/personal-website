import { defineType } from "sanity";
import { defineField } from "sanity";

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
    }),
    defineField({
      name: 'stars',
      title: 'Stars',
      type: 'number',
      validation: Rule => Rule.min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'service',
      title: 'Service',
      type: 'reference',
      to: [{ type: 'service' }],
    }),
  ],
})