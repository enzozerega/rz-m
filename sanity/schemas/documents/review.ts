import {MarkerIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'review',
  title: 'Reseña',
  type: 'document',
  icon: MarkerIcon,
  fields: [
    defineField({
      name: 'name',
      description: 'Reviewer name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Occupation',
      type: 'string',
      description: 'Reviewer occupation',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      validation: (rule) => rule.required(),
      of: [
        {
          type: 'block',
          marks: {
            annotations: [],
            decorators: [
              {
                title: 'Italic',
                value: 'em',
              },
              {
                title: 'Strong',
                value: 'strong',
              },
            ],
          },
          styles: [],
        },
      ],
    }),
  ],
})
