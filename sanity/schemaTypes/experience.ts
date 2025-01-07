import { defineField, defineType } from "sanity";

export const experience = defineType({
    name: 'experience',
    title: 'Experience',
    type: 'document',
    fields: [
      defineField({
        name: 'role',
        title: 'Role',
        type: 'string',
        validation: Rule => Rule.required(),
      }),
      defineField({
        name: 'company',
        title: 'Company',
        type: 'string',
        validation: Rule => Rule.required(),
      }),
      defineField({
        name: 'startDate',
        title: 'Start Date',
        type: 'date',
      }),
      defineField({
        name: 'endDate',
        title: 'End Date',
        type: 'date',
      }),
      defineField({
        name: 'isCurrentRole',
        title: 'Is Current Role',
        type: 'boolean',
        initialValue: false,
      }),
      defineField({
        name: 'description',
        title: 'Description',
        type: 'text',
      }),
      defineField({
        name: 'order',
        title: 'Order',
        type: 'number',
        initialValue: 0,
      }),
    ],
  })   