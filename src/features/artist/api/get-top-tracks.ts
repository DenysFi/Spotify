import type { QueryConfig } from "@/lib/client-query";
import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";

export type TrackType = {
  id: string;
  name: string;
  album: {
    id: string;
    name: string;
    images: { url: string }[];
  };
  artists: { id: string; name: string }[];
  duration_ms: number;
  popularity: number;
  type: "track";
  uri: string;
};

export type ArtistTopTracksResponse = {
  tracks: TrackType[];
};

export const getArtistTopTracks = (
  artistId: string,
  market: string = "US",
): Promise<ArtistTopTracksResponse> => {
  return api
    .get(`/artists/${artistId}/top-tracks`, { params: { market } })
    .then((res) => res.data);
};

export const getArtistTopTracksQueryOptions = (
  artistId: string,
  market: string = "US",
) => {
  return queryOptions({
    queryKey: ["artist-top-tracks", artistId, market],
    queryFn: () => getArtistTopTracks(artistId, market),
  });
};

type UseArtistTopTracksOptions = {
  artistId: string;
  market?: string;
  queryConfig?: QueryConfig<typeof getArtistTopTracksQueryOptions>;
};

export const useArtistTopTracks = ({
  artistId = "",
  market = "US",
  queryConfig,
}: UseArtistTopTracksOptions) => {
  return useQuery({
    ...getArtistTopTracksQueryOptions(artistId, market),
    ...queryConfig,
  });
};
