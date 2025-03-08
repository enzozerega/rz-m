import {FC, ReactNode} from 'react'

export type H1Props = {
  children: ReactNode
}

const H1: FC<H1Props> = ({children}) => {
  return (
    <h1 className="mt-6 mb-4 text-2xl font-extrabold tracking-tight md:text-3xl">{children}</h1>
  )
}

export default H1
