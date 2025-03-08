import {CustomPortableText} from '@/components/CustomPortableText'
import {Header} from '@/components/Header'
import {sanityFetch} from '@/sanity/lib/live'
import {slugsByTypeQuery, talkBySlugQuery} from '@/sanity/lib/queries'
import type {Metadata, ResolvingMetadata} from 'next'
import {toPlainText} from 'next-sanity'
import {draftMode} from 'next/headers'
import {notFound} from 'next/navigation'

type Props = {
  params: Promise<{slug: string}>
}

export async function generateMetadata(
  {params}: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const {data: talk} = await sanityFetch({
    query: talkBySlugQuery,
    params,
    stega: false,
  })

  return {
    title: talk?.title,
    description: talk?.description ? toPlainText(talk.description) : (await parent).description,
  }
}

export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: slugsByTypeQuery,
    params: {type: 'talk'},
    stega: false,
    perspective: 'published',
  })
  return data
}

export default async function TalkSlugRoute({params}: Props) {
  const {data} = await sanityFetch({query: talkBySlugQuery, params})

  // Only show the 404 page if we're in production, when in draft mode we might be about to create a project on this slug, and live reload won't work on the 404 route
  if (!data?._id && !(await draftMode()).isEnabled) {
    notFound()
  }

  // Default to an empty object to allow previews on non-existent documents
  const {description, title, talkUrl} = data ?? {}

  return (
    <div>
      <div className="mb-20 space-y-6">
        <Header
          id={data?._id || null}
          type={data?._type || null}
          path={['description']}
          title={title || (data?._id ? 'Untitled' : '404 Project Not Found')}
          description={description}
        />
        <video width="100%" height="auto" controls allowFullScreen>
          <source src={String(talkUrl)} type="video/mp4" />
        </video>
      </div>
      <div className="absolute left-0 w-screen border-t" />
    </div>
  )
}
