import {defineField, defineType} from 'sanity'

export const basicTypeAgain = defineType({
  title: 'Basic Document Again',
  name: 'basicTypeAgain',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'body',
      type: 'body',
    }),
    defineField({
      name: 'test',
      type: 'boolean',
    }),
  ],
})
