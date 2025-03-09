import {HomeIcon, ImageIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'home',
  title: 'Inicio',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slogan',
      title: 'Slogan',
      type: 'string',
      validation: (rule) => rule.max(155).required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
    defineField({
      name: 'displaypoll',
      title: 'Display Poll Section',
      type: 'boolean',
    }),
    defineField({
      name: 'poll',
      title: 'Poll',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
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
                title: 'Strong',
                value: 'strong',
              },
              {
                title: 'Emphasis',
                value: 'em',
              },
            ],
          },
          styles: [],
        }),
        // Custom blocks
        defineField({
          type: 'image',
          icon: ImageIcon,
          name: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
          preview: {
            select: {
              media: 'asset',
              title: 'caption',
            },
          },
          fields: [
            defineField({
              title: 'Caption',
              name: 'caption',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        subtitle: 'Inicio',
        title,
      }
    },
  },
})
