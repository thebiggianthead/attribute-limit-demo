import {defineField} from 'sanity'

export const simpleBody = defineField({
  name: 'simpleBody',
  title: 'Simple Body',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [],
      lists: [],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Italic', value: 'em'},
        ],
      },
    },
    {
      type: 'code',
    },
  ],
})
