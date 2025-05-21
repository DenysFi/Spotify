import type { QueryConfig } from "@/lib/client-query";
import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";

export type ArtistType = {
  id: string;
  name: string;
  images: { url: string }[];
  followers: { total: number };
  genres: string[];
  popularity: number;
  type: "artist";
  uri: string;
};

export const getArtist = (artistId: string): Promise<ArtistType> => {
  return api.get(`/artists/${artistId}`).then((res) => res.data);
};

export const getArtistQueryOptions = (artistId: string) => {
  return queryOptions({
    queryKey: ["artist", artistId],
    queryFn: () => getArtist(artistId),
  });
};

type UseArtistOptions = {
  artistId: string;
  queryConfig?: QueryConfig<typeof getArtistQueryOptions>;
};

export const useArtist = ({ artistId = "", queryConfig }: UseArtistOptions) => {
  return useQuery({
    ...getArtistQueryOptions(artistId),
    ...queryConfig,
  });
};
