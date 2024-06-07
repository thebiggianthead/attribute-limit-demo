import {defineField} from 'sanity'

export const body = defineField({
  name: 'body',
  title: 'Body',
  type: 'array',
  of: [
    {
      type: 'block',
    },
    {
      type: 'code',
    },
    {
      type: 'accordion',
    },
  ],
})
