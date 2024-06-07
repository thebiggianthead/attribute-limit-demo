// ./schemas/presenterType.ts

import {defineField, defineType} from 'sanity'

import {baseLanguage} from './objects/localeBlockType'

export const objectType = defineType({
  title: 'Object Localisation',
  name: 'objectType',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'localeString',
    }),
    defineField({
      name: 'body',
      type: 'localeBlock',
    }),
  ],
  preview: {
    select: {
      title: `title.${baseLanguage?.id}`,
    },
  },
})
