import { api } from "@/lib/api-client";
import type { QueryConfig } from "@/lib/client-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export type TrackType = {
  tracks: [
    {
      id: string;
      name: string;
      album: {
        id: string;
        name: string;
        images: { url: string }[];
        release_date: string;
      };
      images: { url: string }[];
      artists: { id: string; name: string }[];
      duration_ms: number;
      popularity: number;
      type: "track";
      uri: string;
      preview_url: string | null;
      track_number: number;
    },
  ];
};

export const getTrack = (trackId: string): Promise<TrackType> => {
  return api.get(`/tracks?ids=${trackId}`).then((res) => res.data);
};

export const getTrackQueryOptions = (trackId: string) => {
  return queryOptions({
    queryKey: ["track", trackId],
    queryFn: () => getTrack(trackId),
  });
};

type UseTrackOptions = {
  trackId: string;
  queryConfig?: QueryConfig<typeof getTrackQueryOptions>;
};

export const useTrack = ({ trackId = "", queryConfig }: UseTrackOptions) => {
  return useQuery({
    ...getTrackQueryOptions(trackId),
    ...queryConfig,
  });
};
