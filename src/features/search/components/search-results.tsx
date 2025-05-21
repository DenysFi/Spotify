import Box from "@/components/ui/box/box";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner/spinner";
import { cn } from "@/utils/cn";
import { CardVariantsEnum } from "@/utils/get-text-by-type";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../api/search-api";

import CardItem from "@/components/ui/card-item/card-item";
// Используем  функцию joinArtists для SpotifyArtist
function joinSpotifyArtists(artists?: { name: string }[] | null) {
  return artists?.map((artist) => artist?.name || "").join(", ") || "";
}

type SearchResultsProps = {
  query: string;
};

function SearchResults({ query }: SearchResultsProps) {
  const { data, isLoading, isError } = useSearch({ query });
  const [showMoreAlbums, setShowMoreAlbums] = useState(false);
  const [showMoreArtists, setShowMoreArtists] = useState(false);
  const [showMorePlaylists, setShowMorePlaylists] = useState(false);
  const [showMoreTracks, setShowMoreTracks] = useState(false);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-center">
        Произошла ошибка при поиске. Пожалуйста, попробуйте снова.
      </div>
    );
  }

  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="text-textSubdued p-4 text-center">
        {query
          ? "Ничего не найдено. Попробуйте другой поисковый запрос."
          : "Введите поисковый запрос для поиска."}
      </div>
    );
  }
  const hasArtists =
    data.artists && data.artists.items && data.artists.items.length > 0;
  const hasAlbums =
    data.albums && data.albums.items && data.albums.items.length > 0;
  const hasTracks =
    data.tracks && data.tracks.items && data.tracks.items.length > 0;
  const hasPlaylists =
    data.playlists && data.playlists.items && data.playlists.items.length > 0;

  const albumsToShow = showMoreAlbums
    ? data.albums?.items || []
    : (data.albums?.items || []).slice(0, 6);

  const artistsToShow = showMoreArtists
    ? data.artists?.items || []
    : (data.artists?.items || []).slice(0, 6);

  const playlistsToShow = showMorePlaylists
    ? data.playlists?.items.filter(Boolean) || []
    : data.playlists?.items?.slice(0, 6).filter(Boolean) || [];

  const tracksToShow = showMoreTracks
    ? data.tracks?.items || []
    : (data.tracks?.items || []).slice(0, 10);

  const handleCardClick = (type: string, id: string) => {
    if (type && id) {
      navigate(`/app/${type}/${id}`);
    }
  };

  return (
    <div className="flex flex-col gap-6 py-4">
      {/* Albums section */}
      {hasAlbums && (
        <Box>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Альбомы</h2>
            {data.albums && data.albums.items.length > 6 && (
              <Button
                variant="text"
                size="sm"
                onClick={() => setShowMoreAlbums(!showMoreAlbums)}
                className="text-textSubdued hover:text-white"
              >
                {showMoreAlbums ? "Показать меньше" : "Показать больше"}
              </Button>
            )}
          </div>

          <div className="md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 grid grid-cols-[repeat(auto-fit,_minmax(7rem,_15rem))] gap-4">
            {albumsToShow.map((album) => (
              <div className="h-fit">
                <CardItem
                  onCLick={() =>
                    handleCardClick(CardVariantsEnum.album, album.id)
                  }
                  variant={album.type}
                  item={{
                    imageSrc: album.images?.[0]?.url || "",
                    name: album.name,
                    subText: joinSpotifyArtists(album.artists),
                  }}
                />
              </div>
            ))}
          </div>
        </Box>
      )}

      {/* Artists section */}
      {hasArtists && (
        <Box>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Исполнители</h2>
            {data.artists && data.artists.items.length > 6 && (
              <Button
                variant="text"
                size="sm"
                onClick={() => setShowMoreArtists(!showMoreArtists)}
                className="text-textSubdued hover:text-white"
              >
                {showMoreArtists ? "Показать меньше" : "Показать больше"}
              </Button>
            )}
          </div>
          <div className="mt-6 grid grid-cols-[repeat(auto-fit,_minmax(7rem,_15rem))] grid-rows-[auto] @[530px]:grid-cols-[repeat(3,_minmax(7rem,_15rem))] @[720px]:grid-cols-[repeat(4,_minmax(7rem,_15rem))] @[905px]:grid-cols-[repeat(5,_minmax(7rem,_15rem))] @[1095px]:grid-cols-[repeat(6,_minmax(7rem,_15rem))] @[1285px]:grid-cols-[repeat(8,_minmax(7rem,_15rem))] @[1420px]:grid-cols-[repeat(10,_minmax(7rem,_15rem))]">
            {artistsToShow.map((artist) => (

            <div className="h-fit">

            <CardItem
            onCLick={() => handleCardClick(CardVariantsEnum.artist, artist.id)}
            variant={CardVariantsEnum.artist}
            item={{
              imageSrc: artist.images?.[0]?.url || "",
              name: artist.name,
              subText: "Исполнитель",
            }}
            />
            </div>

             
            ))}
          </div>
        </Box>
      )}
      {/* Playlists section */}
      {hasPlaylists && (
        <Box className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Плейлисты</h2>
            {data.playlists && data.playlists.items.length > 6 && (
              <Button
                variant="text"
                size="sm"
                onClick={() => setShowMorePlaylists(!showMorePlaylists)}
                className="text-textSubdued hover:text-white"
              >
                {showMorePlaylists ? "Показать меньше" : "Показать больше"}
              </Button>
            )}
          </div>
         
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(7rem,_15rem))] gap-4">
            {playlistsToShow.map((playlist) => (

<div className="h-fit">

<CardItem
onCLick={() => handleCardClick(CardVariantsEnum.playlist, playlist.id)}
variant={CardVariantsEnum.playlist}
item={{
  imageSrc: playlist.images?.[0]?.url || "",
  name: playlist.name,
  subText: playlist.owner.display_name,
}}
/>
</div>
              
            ))}
          </div>
        </Box>
      )}

      {/* Tracks section */}
      {hasTracks && (
        <Box className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Треки</h2>
            {data.tracks && data.tracks.items.length > 6 && (
              <Button
                variant="text"
                size="sm"
                onClick={() => setShowMoreTracks(!showMoreTracks)}
                className="text-textSubdued hover:text-white"
              >
                {showMoreTracks ? "Показать меньше" : "Показать больше"}
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-1">
            {tracksToShow.map((track, index) => (
              <div
                key={track.id}
                className={cn(
                  "flex cursor-pointer items-center rounded-md p-2 transition-colors hover:bg-[#252525]",
                )}
              >
                <div className="text-textSubdued mr-4 w-10 text-center">
                  {index + 1}
                </div>
                <div className="mr-4 flex-shrink-0"></div>
                <div className="min-w-0 flex-grow">
                  <p className="truncate font-medium">{track?.name || ""}</p>
                  <p className="text-textSubdued truncate text-sm">
                    {joinSpotifyArtists(track?.artists)}
                  </p>
                </div>
                <div className="text-textSubdued ml-4 text-sm">
                  {formatDuration(track?.duration_ms || 0)}
                </div>
              </div>
            ))}
          </div>
        </Box>
      )}

      {/* No results */}
      {!hasArtists && !hasAlbums && !hasTracks && !hasPlaylists && (
        <div className="text-textSubdued p-6 text-center">
          Ничего не найдено по запросу "{query}". Попробуйте изменить поисковый
          запрос.
        </div>
      )}
    </div>
  );
}

// Вспомогательная функция для форматирования длительности
function formatDuration(ms: number = 0): string {
  if (!ms) return "0:00";
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${Number(seconds) < 10 ? "0" : ""}${seconds}`;
}

export default SearchResults;
