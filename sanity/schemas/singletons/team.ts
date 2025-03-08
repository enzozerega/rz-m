import {ListIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'team',
  title: 'Equipo',
  type: 'document',
  icon: ListIcon,
  fields: [
    defineField({
      name: 'teamMembers',
      title: 'Members',
      description: 'Select the members of your team.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'member'}],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Equipo',
      }
    },
  },
})
