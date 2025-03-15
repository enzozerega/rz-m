import {client} from './client'

const sanityFetch = async ({query, params}: {query: string, params?: object}) => {
  const data = await client.fetch(query, params)
  return {data}
}

export {sanityFetch}