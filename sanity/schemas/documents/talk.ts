import {DocumentVideoIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'talk',
  title: 'Charla',
  type: 'document',
  icon: DocumentVideoIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'talk',
      title: 'Talk',
      type: 'file',
      description: 'Allowed file types: .mp4',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
      hidden: true,
    }),
    defineField({
      name: 'overview',
      title: 'Short Description',
      type: 'string',
      validation: (rule) => rule.max(350),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        defineArrayMember({
          lists: [],
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Url',
                  },
                ],
              },
            ],
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
          type: 'block',
        }),
      ],
    }),
  ],
})
