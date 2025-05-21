import { Button } from "@/components/ui/button";
import InfiniteScroll from "@/components/ui/infinite-scroll/infinite-scroll";
import { convertTime } from "@/utils/convert-time";
import { concatPages, joinArtists } from "@/utils/tracks-utils";
import { Clock, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { usePlaylistTracks } from "../api/get-playlist-tracks";
import { month } from "../contants";
import TracksTable from "./tracks-table";

function PlaylistTracks({ id }: { id: string }) {
  const {
    isFetched,
    isFetchingNextPage,
    hasNextPage,
    data,
    isLoading,
    fetchNextPage,
  } = usePlaylistTracks({
    playlistId: id,
  });
  const tracks = concatPages(data?.pages);

  return (
    <div className="relative z-20 p-[var(--content-spacing)]" key={id}>
      <InfiniteScroll show={isFetched && hasNextPage} callback={fetchNextPage}>
        <TracksTable
          ids={tracks.map((item) => item.track.id)}
          isLoading={!data || isLoading || isFetchingNextPage}
          data={tracks}
          columns={[
            {
              title: "#",
              field: "#",
              Cell: ({ index }) => {
                return (
                  <>
                    <span className="pointer-events-none absolute right-1 top-[50%] translate-y-[-50%] group-hover:hidden">
                      {index + 1}
                    </span>
                    <Button
                      className="hidden group-hover:block"
                      variant={"iconTransparent"}
                      size={"icon"}
                    >
                      <Play
                        width={"16"}
                        height={"16"}
                        fill="white"
                        stroke="white"
                      />
                    </Button>
                  </>
                );
              },
            },
            {
              title: "Название",
              field: "track",
              Cell: ({ entry: { track } }) => {
                return (
                  <div className="flex items-center gap-2">
                    <div className="h-[2.5rem] w-[2.5rem] shrink-0 overflow-hidden rounded-[4px]">
                      <img
                        src={track.album.images.reverse()[0].url}
                        alt={track.album.name}
                      />
                    </div>
                    <div>
                      <div className="text-ellipsis-custom leading-6">
                        {track.name}
                      </div>
                      <a
                        className="text-ellipsis-custom text-sm text-textButton hover:underline group-hover:text-white"
                        href="#"
                      >
                        {joinArtists(track.artists)}
                      </a>
                    </div>
                  </div>
                );
              },
            },
            {
              title: "Альбом",
              field: "album",
              Cell: ({ entry }) => {
                return (
                  <span className="text-sm text-textButton hover:underline">
                    <Link
                      className="text-ellipsis-custom group-hover:text-white"
                      to={`../album/${entry.track.album.id}`}
                    >
                      {entry.track.album.name}
                    </Link>
                  </span>
                );
              },
            },
            {
              title: "Дата добавления",
              field: "added_at",
              Cell: ({ entry: { added_at } }) => {
                const date = new Date(added_at);
                return (
                  <span className="text-sm text-textButton">
                    {date.getDate()} {month[date.getMonth()]}{" "}
                    {date.getFullYear()}
                    г.
                  </span>
                );
              },
            },
            {
              title: <Clock className="h-4 w-4 text-textButton" />,
              field: "duration_ms",
              Cell: ({ entry }) => {
                const [h, m, s] = convertTime(entry.track.duration_ms);
                return (
                  <span className="text-sm text-textButton">
                    {m}:{s.toString().padStart(2, "0")}
                  </span>
                );
              },
            },
          ]}
        />
      </InfiniteScroll>
    </div>
  );
}

export default PlaylistTracks;
