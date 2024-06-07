import pluralize from 'pluralize-esm'
import {defineField} from 'sanity'

export const accordion = defineField({
  name: 'accordion',
  title: 'Accordion',
  type: 'object',
  fields: [
    // Groups
    defineField({
      name: 'groups',
      title: 'Groups',
      type: 'array',
      of: [
        {
          name: 'group',
          title: 'Group',
          type: 'object',
          icon: false,
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'body',
              title: 'Body',
              type: 'simpleBody',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
            },
            prepare({title}) {
              return {
                title,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      groups: 'groups',
      url: 'url',
    },
    prepare(selection) {
      const {groups} = selection
      return {
        subtitle: 'Accordion',
        title: groups?.length > 0 ? pluralize('group', groups.length, true) : 'No groups',
      }
    },
  },
})
