import '@/styles/index.css'
import {Footer} from '@/components/Footer'
import {Navbar} from '@/components/Navbar'
import {sanityFetch} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import type {Viewport} from 'next'
import {Toaster} from 'sonner'

export const viewport: Viewport = {
  themeColor: '#000',
}

export default async function IndexRoute({children}: {children: React.ReactNode}) {
  const {data} = await sanityFetch({query: settingsQuery})

  return (
    <>
      <Navbar data={data} />
      <div className="flex px-4 md:px-16 lg:px-[12.5rem] min-h-screen flex-col bg-white text-black mb-7">
        <div>{children}</div>
      </div>
      <Footer data={data?.team} />
      <Toaster />
    </>
  )
}
