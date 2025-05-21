import type { QueryConfig } from "@/lib/client-query";
import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";

export type ArtistAlbumType = {
  album_type: "album" | "single" | "compilation";
  id: string;
  images: { url: string }[];
  name: string;
  release_date: string;
  type: "album";
  artists: { id: string; name: string }[];
  total_tracks: number;
};

export type ArtistAlbumsResponse = {
  items: ArtistAlbumType[];
  total: number;
  limit: number;
  offset: number;
};

export const getArtistAlbums = (
  artistId: string,
  params: { limit?: number; offset?: number } = {},
): Promise<ArtistAlbumsResponse> => {
  return api
    .get(`/artists/${artistId}/albums`, { params })
    .then((res) => res.data);
};

export const getArtistAlbumsQueryOptions = (
  artistId: string,
  params: { limit?: number; offset?: number } = {},
) => {
  return queryOptions({
    queryKey: ["artist-albums", artistId, params],
    queryFn: () => getArtistAlbums(artistId, params),
  });
};

type UseArtistAlbumsOptions = {
  artistId: string;
  params?: { limit?: number; offset?: number };
  queryConfig?: QueryConfig<typeof getArtistAlbumsQueryOptions>;
};

export const useArtistAlbums = ({
  artistId = "",
  params = {},
  queryConfig,
}: UseArtistAlbumsOptions) => {
  return useQuery({
    ...getArtistAlbumsQueryOptions(artistId, params),
    ...queryConfig,
  });
};
