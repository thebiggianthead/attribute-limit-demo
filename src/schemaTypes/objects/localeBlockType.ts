import {defineField, defineType} from 'sanity'

import {LANGUAGES} from '../../../src/lib/languages'

export const baseLanguage = LANGUAGES.find((l) => l.isDefault)

export const localeBlock = defineType({
  title: 'Localized block',
  name: 'localeBlock',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: {collapsible: true},
    },
  ],
  fields: LANGUAGES.map((lang) =>
    defineField({
      title: lang.title,
      name: lang.id,
      type: 'body',
      fieldset: lang.isDefault ? undefined : 'translations',
    }),
  ),
})
