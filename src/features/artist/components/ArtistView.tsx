import { Button } from "@/components/ui/button";
import CardCover from "@/components/ui/card-cover/card-cover";
import CardItem from "@/components/ui/card-item/card-item";
import TracksTable from "@/features/playlists/compontents/tracks-table";
import { useColor } from "@/hooks/use-color";
import { cn } from "@/utils/cn";
import { convertTime } from "@/utils/convert-time";
import { Clock, Play } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useArtist } from "../api/get-artist";
import { useArtistAlbums } from "../api/get-artist-albums";
import { useArtistTopTracks } from "../api/get-top-tracks";
import ArtistHeader from "./ArtistHeader";

function ArtistView() {
  // ID артиста (например, для The Beatles)
  const { artistId } = useParams()!;
  const navigate = useNavigate();
  // 1. Запрос для получения данных артиста
  const {
    data: artist,
    isLoading: isArtistLoading,
    error: artistError,
  } = useArtist({ artistId: artistId as string });

  // 2. Запрос для получения альбомов артиста (с пагинацией: первые 10 альбомов)
  const {
    data: albumsResponse,
    isLoading: isAlbumsLoading,
    error: albumsError,
  } = useArtistAlbums({
    artistId: artistId as string,
    params: { limit: 10, offset: 0 },
  });

  // 3. Запрос для получения топ-треков артиста (для рынка US)
  const {
    data: topTracks,
    isLoading: isTracksLoading,
    error: tracksError,
  } = useArtistTopTracks({ artistId: artistId as string, market: "US" });

  const trackIds = topTracks?.tracks.map((track) => track.id).join(",") || "";

  // const { data: track, isLoading, error } = useTrack({ trackId: trackIds });

  const bgColor = useColor(artist?.images[0]?.url);

  return (
    <section>
      <ArtistHeader
        data={{
          image: artist?.images[0]?.url,
          name: artist?.name,
          popularity: artist?.popularity,
          followers: artist?.followers.total,
          genres: artist?.genres,
        }}
        id={artistId as string}
        isLoading={isArtistLoading}
      ></ArtistHeader>
      <div className="relative">
        <div
          className="tracks-bg absolute left-0 top-0 h-[14.5rem] w-full"
          style={{ backgroundColor: bgColor }}
        ></div>

        <div className="relative z-20 p-[var(--content-spacing)]">
          <h3 className="mb-4 mt-4 text-2xl font-bold">Топ треки артиста</h3>
          <TracksTable
            isLoading={isTracksLoading}
            hideHeader={true}
            data={topTracks?.tracks}
            grid={"compact"}
            ids={trackIds.split(",")}
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
                Cell: ({ entry: { name, album } }) => {
                  return (
                    <div className="flex items-center gap-2">
                      <div className="mr-2 h-10 w-10 overflow-hidden rounded-sm">
                        <CardCover size={"sm"} imgSrc={album.images[0]?.url} />
                      </div>
                      <div className="text-ellipsis-custom leading-6">
                        {name}
                      </div>
                    </div>
                  );
                },
              },
              {
                title: <Clock className="h-4 w-4 text-textButton" />,
                field: "duration_ms",
                Cell: ({ entry: { duration_ms } }) => {
                  const [_, m, s] = convertTime(duration_ms);

                  return (
                    <span className="text-sm text-textButton">
                      {m}:{s.toString().padStart(2, "0")}
                    </span>
                  );
                },
              },
            ]}
          />
        </div>
        <div className="relative z-20 p-[var(--content-spacing)]">
          <h3 className="mb-4 mt-4 text-2xl font-bold">Альбомы артиста</h3>
          <div
            className={cn(
              `mt-6 grid grid-cols-[repeat(auto-fill,_minmax(7rem,_15rem))] grid-rows-[auto] @[530px]:grid-cols-[repeat(3,_minmax(7rem,_15rem))] @[720px]:grid-cols-[repeat(4,_minmax(7rem,_15rem))] @[905px]:grid-cols-[repeat(5,_minmax(7rem,_15rem))] @[1095px]:grid-cols-[repeat(6,_minmax(7rem,_15rem))] @[1285px]:grid-cols-[repeat(8,_minmax(7rem,_15rem))] @[1420px]:grid-cols-[repeat(10,_minmax(7rem,_15rem))]`,
            )}
          >
            {albumsResponse?.items.map((item) => (
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

export default ArtistView;
