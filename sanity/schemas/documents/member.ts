import {CaseIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'member',
  title: 'Miembro',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'name',
      description: 'Member name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'Member role. This field is optional.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      hidden: true,
    }),
  ],
})
