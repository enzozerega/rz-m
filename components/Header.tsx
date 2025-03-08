import {CustomPortableText} from '@/components/CustomPortableText'
import type {PathSegment} from 'sanity'

interface HeaderProps {
  id: string | null
  type: string | null
  path: PathSegment[]
  centered?: boolean
  description?: null | any[]
  title?: string | null
  imageUrl?: string | null
}
export function Header(props: HeaderProps) {
  const {id, type, path, title, description, imageUrl, centered = false} = props
  if (!description && !title && !imageUrl) {
    return null
  }
  return (
    <div className={`${centered ? 'text-center' : 'w-5/6 lg:w-3/5'}`}>
      {title && <div className="text-3xl font-extrabold tracking-tight md:text-5xl">{title}</div>}
      {description && (
        <div className="mt-4 text-pretty font-serif text-xl text-gray-600 md:text-2xl">
          <CustomPortableText id={id} type={type} path={path} value={description} />
        </div>
      )}
      {imageUrl && (
        <div className="mt-4">
          <img src={imageUrl} className="w-full rounded-md" />
        </div>
      )}
    </div>
  )
}
