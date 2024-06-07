import {codeInput} from '@sanity/code-input'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'

import {attributes} from './plugins/attributes'
import {LANGUAGES} from './src/lib/languages'
import {schemaTypes} from './src/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Attribute Limit',

  projectId: 'pjpqerlt',
  dataset: 'attribute-example',

  plugins: [
    structureTool(),
    visionTool(),
    internationalizedArray({
      languages: LANGUAGES,
      defaultLanguages: ['en'],
      fieldTypes: ['string', 'body'],
    }),
    attributes(),
    codeInput(),
  ],

  schema: {
    types: schemaTypes,
  },

  scheduledPublishing: {
    enabled: false,
  },
})
