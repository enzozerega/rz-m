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
      description:
        'This field will be displayed as the title of the talk. It also appears in the URL.',
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
      name: 'description',
      description: 'Add a description of the talk. This field is optional.',
      title: 'Description',
      type: 'array',
      of: [
        defineArrayMember({
          lists: [],
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
              {
                title: 'Link',
                value: 'link',
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
