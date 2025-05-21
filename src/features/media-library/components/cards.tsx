import { useSidebar } from "@/components/ui/sidebar/context/useSidebar.hook";
import { SidebarItem } from "@/components/ui/sidebar/sidebar";
import { useAlbums } from "@/features/album/api/useAlbums";
import { cn } from "@/utils/cn";
import { useRecentlyListened } from "@/utils/recently-listened-context";
import { useEffect, useMemo } from "react";
import { useArtists } from "../api/get-recently-listened";
import { useSearch } from "./main";
import {
  isAlbum,
  isPlaylist,
  type AlbumArtist,
  type CardType,
  type PlaylistOwner,
} from "../types";
import Card from "./card";
import CardSkeletons from "./card-skeletons";

import { usePlaylists } from "@/features/playlists/api/get-playlists";
import { ArchiveX } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function noramlizeData(data: any[]): CardType[] {
  return data?.map((item) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const base: any = {
      id: item.id,
      title: item.name,
      img: item.images[0]?.url,
      type: item.type,
    };

    if (isAlbum(item)) {
      base["artists"] = (item.artists as unknown[] as AlbumArtist[]).map(
        (a) => a.name,
      );
    }

    if (isPlaylist(item)) {
      base["owner"] = (item.owner as unknown as PlaylistOwner).display_name;
    }

    return base;
  });
}

function RecentlyListened() {
  const { expanded } = useSidebar();
  const { recentlyListened, isLoading: contextIsLoading } = useRecentlyListened();
  // Получаем строку поиска из контекста
  const { searchTerm } = useSearch();

  const artistsQuery = useArtists({
    artistsIds: recentlyListened.artist || [],
  });
  const albumsQuery = useAlbums({
    albumIds: recentlyListened.album || [],
  });
  const playlistsQuery = usePlaylists({
    playlistIds: recentlyListened.playlist || [],
  });

  const isFetching =
    artistsQuery.isFetching ||
    albumsQuery.isFetching ||
    playlistsQuery.isFetching;

  const recent = useMemo((): CardType[] => {
    const normalizedData = noramlizeData([
      ...artistsQuery.data,
      ...albumsQuery.data,
      ...playlistsQuery.data,
    ]);
    
    // Применяем фильтрацию, если есть строка поиска
    if (searchTerm && searchTerm.trim()) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      return normalizedData.filter(item => {
        // Поиск по названию (для всех типов)
        const titleMatch = item.title.toLowerCase().includes(lowerCaseSearch);
        
        // Поиск по имени артиста, если это альбом
        let artistMatch = false;
        if (isAlbum(item) && item.artists) {
          artistMatch = item.artists.some(artist => 
            artist.toLowerCase().includes(lowerCaseSearch)
          );
        }
        
        // Поиск по владельцу, если это плейлист
        let ownerMatch = false;
        if (isPlaylist(item) && item.owner) {
          ownerMatch = item.owner.toLowerCase().includes(lowerCaseSearch);
        }
        
        return titleMatch || artistMatch || ownerMatch;
      });
    }
    
    return normalizedData;
  }, [artistsQuery, albumsQuery, playlistsQuery, searchTerm]);

  const isEmpty =
    !recentlyListened.album &&
    !recentlyListened.artist &&
    !recentlyListened.playlist;

  useEffect(() => {
    if (!recentlyListened.album) return;

    if (recentlyListened.album.length > 0) {
      albumsQuery.refetch();
    }
  }, [recentlyListened.album, albumsQuery.refetch]);

  useEffect(() => {
    if (!recentlyListened.playlist) return;

    if (recentlyListened.playlist.length > 0) {
      playlistsQuery.refetch();
    }
  }, [recentlyListened.playlist, playlistsQuery.refetch]);

  useEffect(() => {
    if (!recentlyListened.artist) return;

    if (recentlyListened.artist.length > 0) {
      artistsQuery.refetch();
    }
  }, [recentlyListened.artist, artistsQuery.refetch]);

  return (
    <div>
      
      {isEmpty ? (
        <div
          className={cn(
            "m-2 flex flex-col items-center justify-center rounded-md bg-[var(--background-elevated-base)] p-2",
            {
              "m-1": !expanded,
            },
          )}
        >
          {expanded && (
            <h4 className="mb-2 text-textButton">No favorites yet</h4>
          )}
          <ArchiveX className="text-textButton" />
        </div>
      ) : (
        <ul
          role="list"
          tabIndex={0}
          className={cn("m-2", {
            "m-1": !expanded,
          })}
        >
          {isFetching ? (
            <CardSkeletons count={10} />
          ) : (
            recent.map((item) => (
              <SidebarItem key={item.id}>
                <Card cardData={item} />
              </SidebarItem>
            ))
          )}
        </ul>
      )}
      {searchTerm && recent.length === 0 && (
        <div className="px-6 py-2 text-textButton text-sm">
          По запросу ничего не найдено
        </div>
      )}
    </div>
  );
}

export default RecentlyListened;
