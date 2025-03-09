import {CustomPortableText} from '@/components/CustomPortableText'
import {PortableTextBlock} from 'next-sanity'
import {FC, ReactNode} from 'react'

export type PageProps = {
  title?: null | string
  overview?: null | string
  media?: null | ReactNode
  description?: null | PortableTextBlock[]
}

const Page: FC<PageProps> = ({title, overview, description, media}) => (
  <div>
    <div className="text-3xl font-extrabold tracking-tight md:text-5xl">{title}</div>
    <div className="mb-20 space-y-6">
      {overview && (
        <div className="mt-4 text-pretty font-serif text-xl text-gray-600 md:text-2xl">
          {overview}
        </div>
      )}
      {media}
      {description && <CustomPortableText value={description} />}
    </div>
    <div className="absolute left-0 w-screen" />
  </div>
)

export default Page
