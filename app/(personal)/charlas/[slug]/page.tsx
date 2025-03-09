import Page from '@/components/Page'
import {sanityFetch} from '@/sanity/lib/live'
import {talkBySlugQuery} from '@/sanity/lib/queries'
import {draftMode} from 'next/headers'
import {notFound} from 'next/navigation'

type Props = {
  params: Promise<{slug: string}>
}
export default async function PageSlugRoute({params}: Props) {
  const {data} = await sanityFetch({query: talkBySlugQuery, params})

  // Only show the 404 page if we're in production, when in draft mode we might be about to create a project on this slug, and live reload won't work on the 404 route
  if (!data?._id && !(await draftMode()).isEnabled) {
    notFound()
  }

  // Default to an empty object to allow previews on non-existent documents
  const {description, title, talkUrl, overview} = data ?? {}

  return (
    <Page
      title={title}
      media={
        <video width="100%" height="auto" controls allowFullScreen>
          <source src={talkUrl} type="video/mp4" />
        </video>
      }
      description={description}
      overview={overview}
    />
  )
}
