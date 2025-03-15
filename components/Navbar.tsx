'use client'

import type {SettingsQueryResult} from '@/sanity.types'
import {resolveHref} from '@/sanity/lib/utils'
import {stegaClean} from 'next-sanity'
import Link from 'next/link'
import {usePathname} from 'next/navigation'

interface NavbarProps {
  data: SettingsQueryResult
}
export function Navbar(props: NavbarProps) {
  const {data} = props
  const currentRoute = usePathname()

  return (
    <header className="px-6 sticky top-0 z-10 flex flex-wrap items-center gap-x-5 bg-white/80 py-4 backdrop-blur md:py-5">
      <img className="h-6" src={data.logoUrl} alt="Logo" />
      {data?.menuItems?.map((menuItem) => {
        const href = resolveHref(menuItem?._type, menuItem?.slug)
        if (!href) {
          return null
        }
        const isActive = currentRoute === href

        return (
          <Link
            key={menuItem._key}
            className={`text-lg hover:text-black md:text-xl ${
              isActive ? 'font-extrabold text-black' : 'text-gray-600'
            }`}
            href={href}
          >
            {stegaClean(menuItem?._type === 'home' ? 'Inicio' : menuItem.title)}
          </Link>
        )
      })}
    </header>
  )
}
