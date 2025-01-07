import { defineType } from "sanity";
import { defineField } from "sanity";

export const achievement = defineType({
    name: 'achievement',
    title: 'Achievements',
    type: 'document',
    fields: [
      defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: Rule => Rule.required(),
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
        name: 'order',
        title: 'Order',
        type: 'number',
        initialValue: 0,
      }),
    ],
  })