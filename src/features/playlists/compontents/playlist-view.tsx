import { useColor } from "@/hooks/use-color";
import { useRecentlyListened } from "@/utils/recently-listened-context";
import {
  getTrackDuration,
  type GetTrackDurationProps,
} from "@/utils/tracks-utils";
import { useParams } from "react-router-dom";
import { usePlaylist } from "../api/get-playlist";
import { ContentNotFound } from "./content-not-found";
import PlaylistControl from "./playlist-control";
import PlaylistHeader from "./playlist-header";
import PlaylistTracks from "./playlist-tracks";

function PlaylistView() {
  const { playlistId } = useParams();
  const { addToRecentlyListened } = useRecentlyListened();
  const query = usePlaylist({ playlistId: playlistId as string });
  const playlistData = query.data;

  const bgColor = useColor(query.data?.images[0]?.url);

  const tracksTotalDurationMs = getTrackDuration(
    query.data?.tracks.items as GetTrackDurationProps[] | undefined,
  );

  if (query.isError) {
    return <ContentNotFound />;
  }

  return (
    <section className="relative @container">
      <PlaylistHeader
        isLoading={query.isLoading}
        data={{
          label: "Плейлист",
          image: playlistData?.images[0].url,
          name: playlistData?.name,
          description: playlistData?.description,
          display_name: playlistData?.owner.display_name,
          total: playlistData?.tracks.total,
          totalDuration: tracksTotalDurationMs,
        }}
      />
      <div className="relative">
        <div
          className="tracks-bg absolute left-0 top-0 h-[14.5rem] w-full"
          style={{ backgroundColor: bgColor }}
        ></div>
        <PlaylistControl
          itemType="playlist"
          onSave={() => {
            addToRecentlyListened(playlistId as string, "playlist");
          }}
        />
        <PlaylistTracks id={playlistId!} />
      </div>
    </section>
  );
}

export default PlaylistView;
