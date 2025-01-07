import { defineField, defineType } from "sanity";

export const education = defineType({
    name: 'education',
    title: 'Education',
    type: 'document',
    fields: [
      defineField({
        name: 'degree',
        title: 'Degree',
        type: 'string',
        validation: Rule => Rule.required(),
      }),
      defineField({
        name: 'school',
        title: 'School',
        type: 'string',
        validation: Rule => Rule.required(),
      }),
      defineField({
        name: 'year',
        title: 'Year',
        type: 'string',
      }),
      defineField({
        name: 'grades',
        title: 'Grades',
        type: 'array',
        of: [{
          type: 'object',
          fields: [
            { name: 'subject', type: 'string', title: 'Subject' },
            { name: 'grade', type: 'string', title: 'Grade' },
          ],
        }],
      }),
      defineField({
        name: 'order',
        title: 'Order',
        type: 'number',
        initialValue: 0,
      }),
    ],
  })