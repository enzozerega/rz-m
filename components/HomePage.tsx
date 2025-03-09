import type {HomePageQueryResult} from '@/sanity.types'
import {PortableTextBlock} from 'next-sanity'
import Link from 'next/link'
import {CustomPortableText} from './CustomPortableText'
import H1 from './H1'

export interface HomePageProps {
  data: HomePageQueryResult | null
}

export async function HomePage({data}: HomePageProps) {
  const {slogan = '', title = '', talks = [], imageUrl, reviews, poll, displaypoll} = data ?? {}

  return (
    <div>
      <div className={'text-center mb-10'}>
        <div className="text-3xl font-extrabold tracking-tight md:text-5xl">{title}</div>
        <div className="mb-20 space-y-6">
          <div className="mt-4 italic text-pretty font-serif text-xl text-gray-600 md:text-2xl">
            {slogan}
          </div>
          {imageUrl && (
            <div className="mt-4">
              <img src={imageUrl} className="w-full rounded-md" />
            </div>
          )}
        </div>
      </div>

      {talks?.length && <H1>Charlas</H1>}
      {talks.map((talk, idx) => (
        <div className="x-auto max-w-[100rem] border rounded-md mb-4" key={`charla-${idx}`}>
          <Link
            className={`flex flex-col gap-x-5 p-2 hover:bg-gray-50/50 xl:flex-row ${idx % 2 !== 0 ? 'xl:flex-row-reverse' : ''}`}
            href={`/charlas/${talk.slug?.current}`}
          >
            <div className="w-full xl:w-9/12">
              <div className={`w-full overflow-hidden rounded-[3px] relative aspect-[16/9]`}>
                <video className="p-2" width="100%" height="auto" controls allowFullScreen>
                  <source src={String(talk.talkUrl)} type="video/mp4" />
                </video>
              </div>
            </div>
            <div className="flex xl:w-1/4">
              <div className="relative mt-2 flex w-full flex-col justify-between p-3 xl:mt-0">
                <div>
                  <div className="mb-2 text-xl font-extrabold tracking-tight md:text-2xl">
                    {talk.title}
                  </div>
                  <div className="font-serif text-gray-500">{talk.overview}</div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
      {reviews?.length && <H1>Reseñas</H1>}
      {reviews?.map((review, idx) => (
        <div key={`review-${idx}`} className="border rounded-md p-4 mt-4">
          <div className="font-extrabold tracking-tight">
            {review.name} <span className="font-thin pl-2">{review.role}</span>{' '}
          </div>
          <CustomPortableText value={review.content as PortableTextBlock[]} />
        </div>
      ))}
      {displaypoll && (
        <div>
          <H1>¿Cómo está tu organización?</H1>
          <CustomPortableText value={poll as PortableTextBlock[]} />
        </div>
      )}
    </div>
  )
}
