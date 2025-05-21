import { api } from "@/lib/api-client"
import type { QueryConfig } from "@/lib/client-query"
import { queryOptions, useQuery } from "@tanstack/react-query"

export type SpotifyImage = {
  url: string
  height: number
  width: number
}

export type SpotifyArtist = {
  id: string
  name: string
  type: string
  uri: string
  href: string
  images?: SpotifyImage[]
  external_urls: {
    spotify: string
  }
}

export type SpotifyAlbum = {
  id: string
  name: string
  type: string
  uri: string
  artists: SpotifyArtist[]
  images: SpotifyImage[]
  album_type: string
  release_date: string
  total_tracks: number
}

export type SpotifyTrack = {
  id: string
  name: string
  type: string
  uri: string
  album: SpotifyAlbum
  artists: SpotifyArtist[]
  duration_ms: number
  popularity: number
  explicit: boolean
  track_number: number
}

export type SpotifyPlaylist = {
  id: string
  name: string
  type: string
  uri: string
  description: string
  images: SpotifyImage[]
  owner: {
    display_name: string
  }
}

export type SearchResult = {
  albums?: {
    href: string
    items: SpotifyAlbum[]
    limit: number
    next: string | null
    offset: number
    previous: string | null
    total: number
  }
  artists?: {
    href: string
    items: SpotifyArtist[]
    limit: number
    next: string | null
    offset: number
    previous: string | null
    total: number
  }
  tracks?: {
    href: string
    items: SpotifyTrack[]
    limit: number
    next: string | null
    offset: number
    previous: string | null
    total: number
  }
  playlists?: {
    href: string
    items: SpotifyPlaylist[]
    limit: number
    next: string | null
    offset: number
    previous: string | null
    total: number
  }
}

export const searchItems = (query: string): Promise<SearchResult> => {
  // If no query provided, return empty result
  if (!query) {
    return Promise.resolve({})
  }
  
  return api.get(`/search?q=${encodeURIComponent(query)}&type=album,artist,track,playlist`).then(res => res.data)
}

export const getSearchQueryOptions = (query: string) => {
  return queryOptions({
    queryKey: ["search", query],
    queryFn: () => searchItems(query),
    enabled: !!query // Only fetch if query is not empty
  })
}

type UseSearchOptions = {
  query: string
  queryConfig?: QueryConfig<typeof getSearchQueryOptions>
}

export const useSearch = ({ query = "", queryConfig }: UseSearchOptions) => {
  return useQuery({
    ...getSearchQueryOptions(query),
    ...queryConfig,
  })
}
