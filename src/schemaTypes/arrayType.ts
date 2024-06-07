import type {KeyedObject} from 'sanity'
import {defineField, defineType} from 'sanity'

export const arrayType = defineType({
  title: 'Array Localisation',
  name: 'arrayType',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'body',
      type: 'internationalizedArrayBody',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({title}) => {
      const enTitle = title?.length ? title?.find((v: KeyedObject) => v?._key === 'en')?.value : ``

      return {
        title: enTitle || 'no title',
      }
    },
  },
})
