import {Header} from '@/components/Header'
import type {HomePageQueryResult} from '@/sanity.types'
import {PortableTextBlock} from 'next-sanity'
import Link from 'next/link'
import {CustomPortableText} from './CustomPortableText'
import H1 from './H1'

export interface HomePageProps {
  data: HomePageQueryResult | null
}

export async function HomePage({data}: HomePageProps) {
  const {slogan = [], title = '', talks = [], imageUrl, reviews, poll} = data ?? {}
  console.log({data})

  return (
    <div>
      {title && (
        <Header
          id={data?._id || null}
          type={data?._type || null}
          path={['slogan']}
          centered
          title={title}
          description={slogan}
          imageUrl={imageUrl}
        />
      )}

      <H1>Charlas</H1>
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
                  <div className="font-serif text-gray-500">
                    <CustomPortableText
                      id={talk._id}
                      type={talk._type}
                      path={['description']}
                      value={talk.description as PortableTextBlock[]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
      <H1>Reseñas</H1>
      {reviews?.map((review, idx) => (
        <div key={`review-${idx}`} className="border rounded-md p-4 mt-4">
          <div className="text-xl font-extrabold tracking-tight md:text-xl">
            {review.name} <span className="font-thin md:text-lg">{review.role}</span>{' '}
          </div>
          <CustomPortableText
            id={review._id}
            type={review._type}
            path={['content']}
            value={review.content as PortableTextBlock[]}
          />
        </div>
      ))}
      {poll && (
        <div>
          <H1>¿Cómo está tu organización?</H1>
          <div>
            <CustomPortableText
              id={poll._id}
              type={poll._type}
              path={['poll']}
              value={poll as PortableTextBlock[]}
            />
          </div>
        </div>
      )}
    </div>
  )
}
