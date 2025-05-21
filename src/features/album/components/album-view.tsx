import CardItem from "@/components/ui/card-item/card-item";
import { ContentNotFound } from "@/features/playlists/compontents/content-not-found";
import PlaylistControl from "@/features/playlists/compontents/playlist-control";
import PlaylistHeader from "@/features/playlists/compontents/playlist-header";
import { useColor } from "@/hooks/use-color";
import { cn } from "@/utils/cn";
import { getTrackDurationForAlbum, joinArtists } from "@/utils/tracks-utils";
import { useNavigate, useParams } from "react-router-dom";
import { useAlbum } from "../api/get-album";
import { useUserAlbums } from "../api/get-user-albums";
import AlbumCopy from "./album-copy";
import AlbumsTracks from "./album-tracks";

import { useRecentlyListened } from "@/utils/recently-listened-context";

function AlbumView() {
  const { albumId } = useParams()!;
  const navigate = useNavigate();
  const {
    isLoading,
    data: albumData,
    isError,
  } = useAlbum({ albumId: albumId as string });

  const { addToRecentlyListened } = useRecentlyListened();
  const topFiveAlbums = useUserAlbums({
    userID: albumData?.artists[0].id,
  });

  const bgColor = useColor(albumData?.images[0]?.url);

  const tracksTotalDurationMs = getTrackDurationForAlbum(
    albumData?.tracks.items,
  );

  if (isError) {
    return <ContentNotFound />;
  }

  return (
    <section className="relative @container">
      <PlaylistHeader
        isLoading={isLoading}
        data={{
          label: "Альбом",
          image: albumData?.images[0]?.url,
          name: albumData?.name,
          description: "",
          display_name: joinArtists(albumData?.artists),
          total: albumData?.tracks.total,
          totalDuration: tracksTotalDurationMs,
        }}
      />
      <div className="relative">
        <div
          className="tracks-bg absolute left-0 top-0 h-[14.5rem] w-full"
          style={{ backgroundColor: bgColor }}
        ></div>
        <PlaylistControl
          itemType="album"
          onSave={() => {
            addToRecentlyListened(albumId as string, "album");
          }}
        />
        <AlbumsTracks id={albumId!} />
      </div>
      <div className="z-10 p-[var(--content-spacing)]">
        <AlbumCopy
          releaseDate={albumData?.release_date}
          copyrights={albumData?.copyrights}
        />
        <div className="mt-14 @container">
          <h3 className="text-2xl font-bold hover:underline">
            {albumData?.artists[0].name}: другие альбомы
          </h3>
          <div
            className={cn(
              `mt-6 grid grid-cols-[repeat(2,_minmax(7rem,_15rem))] grid-rows-[auto] @[530px]:grid-cols-[repeat(3,_minmax(7rem,_15rem))] @[720px]:grid-cols-[repeat(4,_minmax(7rem,_15rem))] @[905px]:grid-cols-[repeat(5,_minmax(7rem,_15rem))] @[1095px]:grid-cols-[repeat(6,_minmax(7rem,_15rem))] @[1285px]:grid-cols-[repeat(8,_minmax(7rem,_15rem))] @[1420px]:grid-cols-[repeat(10,_minmax(7rem,_15rem))]`,
            )}
          >
            {// @ts-expect-error  @ts-ignore (will be fixed in the next step)
            topFiveAlbums.data?.items.map((item) => (
              <CardItem
                key={item.id}
                onCLick={() => {
                  navigate(`../album/${item.id}`);
                }}
                item={{
                  imageSrc: item.images.reverse()[0]?.url,
                  name: item.name,
                  subText: `${item.release_date.split("-")[0]} • ${item.album_type}`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AlbumView;
