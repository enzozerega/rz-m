import Page from '@/components/Page'
import {sanityFetch} from '@/sanity/lib/live'
import {pagesBySlugQuery} from '@/sanity/lib/queries'
import {draftMode} from 'next/headers'
import {notFound} from 'next/navigation'

type Props = {
  params: Promise<{slug: string}>
}

export default async function PageSlugRoute({params}: Props) {
  const {data} = await sanityFetch({query: pagesBySlugQuery, params})

  // Only show the 404 page if we're in production, when in draft mode we might be about to create a page on this slug, and live reload won't work on the 404 route
  if (!data?._id && !(await draftMode()).isEnabled) {
    notFound()
  }

  const {description, title, overview} = data ?? {}

  return <Page title={title} overview={overview} description={description} />
}
