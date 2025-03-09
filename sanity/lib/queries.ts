import {defineQuery} from 'next-sanity'

export const homePageQuery = defineQuery(`
  *[_type == "home"][0]{
    _id,
    _type,
    slogan,
    title,
    poll,
    displaypoll,
    "imageUrl": image.asset->url,
    "talks":*[_type == "talk"]{
      _id,
      _type,
      slug,
      title,
      overview,
      "talkUrl": talk.asset->url
    },
    "reviews":*[_type == "review"]{
      _id,
      _type,
      name,
      role,
      content
    }
  }
`)

export const pagesBySlugQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    _type,
    description,
    overview,
    title,
    "slug": slug.current,
  }
`)

export const talkBySlugQuery = defineQuery(`
  *[_type == "talk" && slug.current == $slug][0] {
    _id,
    _type,
    overview,
    description,
    "slug": slug.current,
    title,
    "talkUrl": talk.asset->url
  }
`)

export const settingsQuery = defineQuery(`
  *[_type == "settings"][0]{
    _id,
    _type,
    menuItems[]{
      _key,
      ...@->{
        _type,
        "slug": slug.current,
        title
      }
    },
    "logoUrl": logo.asset->url,
    "team":*[_type == "member"]{
      name,
      role
    },
  }
`)

export const memberBySlugQuery = defineQuery(`
  *[_type == "member" && slug.current == $slug][0] {
   name,
   role
  }
`)

export const slugsByTypeQuery = defineQuery(`
  *[_type == $type && defined(slug.current)]{"slug": slug.current}
`)
