import {defineField, defineType} from 'sanity'

export const basicType = defineType({
  title: 'Basic Document',
  name: 'basicType',
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
      type: 'string',
    }),
  ],
})
