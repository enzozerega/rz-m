import type {MemberBySlugQueryResult} from '@/sanity.types'
import H1 from './H1'

interface FooterProps {
  data?: MemberBySlugQueryResult[]
}
export function Footer(props: FooterProps) {
  const {data} = props
  return (
    <footer className="flex flex-col flex-wrap px-4 md:px-16 lg:px-[12.5rem] pb-6 text-white bg-black">
      <H1>Equipo</H1>
      <div className="items-center gap-x-5 backdrop-blur">
        {data?.map((member, idx) => (
          <div key={`member-${idx}`}>
            <span className="font-bold">{member?.name}</span> <span>{member?.role}</span>
          </div>
        ))}
      </div>
    </footer>
  )
}
