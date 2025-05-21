import { api } from "@/lib/api-client";
import type { QueryConfig } from "@/lib/client-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

// Типы для данных Spotify
export type ArtistType = {
  id: string;
  name: string;
  type: "artist";
  images: { url: string }[];
  popularity: number;
  genres: string[];
};

export type AlbumType = {
  id: string;
  name: string;
  type: "album";
  images: { url: string }[];
  artists: ArtistType[];
  release_date: string;
  total_tracks: number;
  popularity: number;
};

export type PlaylistType = {
  description: string;
  owner: { display_name: string };
  id: string;
  images: { url: string }[];
  name: string;
  type: "playlist";
  followers: { total: number };
  tracks: { items: TrackItemsType[]; total: number };
};

export type TrackItemsType = {
  added_at: string;
  added_by: { id: string; type: "user" };
  track: TrackItemType;
};

export type TrackItemType = {
  duration_ms: string;
  id: string;
  name: string;
  popularity: number;
  type: "track";
  album: Omit<AlbumType, "popularity">;
  artists: ArtistType[];
  track_number: number;
};

const getRandomChar = () => {
  // Диапазоны символов
  const latinRange = { start: 97, length: 26 }; // a-z

  // Генерируем случайный символ
  const randomCharCode =
    latinRange.start + Math.floor(Math.random() * latinRange.length);
  return String.fromCharCode(randomCharCode);
};

async function getRandomPlaylists(limit = 50) {
  const randomChar1 = getRandomChar();
  const response1 = await api.get("/search", {
    params: {
      q: `%${randomChar1}%`,
      type: "playlist",
      limit: 30,
      market: "FR",
    },
  });
  const randomChar2 = getRandomChar();
  const response2 = await api.get("/search", {
    params: {
      q: `%${randomChar2}%`,
      type: "playlist",
      limit: 30,
      market: "FR",
    },
  });

  return [
    response1.data.playlists.items.filter((item) => item !== null),
    response2.data.playlists.items.filter((item) => item !== null),
  ].flat();
}

// Функция для получения случайных альбомов
export const getRandomAlbums = async (
  limit: number = 5,
): Promise<AlbumType[]> => {
  const randomChar1 = getRandomChar();
  const response1 = await api.get("/search", {
    params: {
      q: `${randomChar1}*`,
      type: "album",
      limit,
    },
  });
  const randomChar2 = getRandomChar();
  const response2 = await api.get("/search", {
    params: {
      q: `${randomChar2 + randomChar1}*`,
      type: "album",
      limit,
    },
  });
  const randomChar3 = getRandomChar();
  const response3 = await api.get("/search", {
    params: {
      q: `${randomChar3 + randomChar2 + randomChar1}*`,
      type: "album",
      limit,
    },
  });
  return [
    response1.data.albums.items,
    response2.data.albums.items,
    response3.data.albums.items,
  ]
    .flat()
    .sort(() => Math.random() - 0.5);
};

// Функция для получения случайных артистов
export const getRandomArtists = async (
  limit: number = 5,
): Promise<ArtistType[]> => {
  const randomChar = getRandomChar();
  const response = await api.get("/search", {
    params: {
      q: `${randomChar}*`,
      type: "artist",
      limit,
    },
  });
  const randomChar2 = getRandomChar();
  const response2 = await api.get("/search", {
    params: {
      q: `${randomChar2 + randomChar}*`,
      type: "artist",
      limit,
    },
  });
  const randomChar3 = getRandomChar();
  const response3 = await api.get("/search", {
    params: {
      q: `${randomChar3 + randomChar2 + randomChar}*`,
      type: "artist",
      limit,
    },
  });
  return [
    response.data.artists.items,
    response2.data.artists.items,
    response3.data.artists.items,
  ]
    .flat()
    .sort(() => Math.random() - 0.5);
};

// Функция для получения новых релизов
export const getNewReleases = async (
  limit: number = 5,
): Promise<AlbumType[]> => {
  const response = await api.get("/browse/new-releases", {
    params: { limit },
  });
  return response.data.albums.items;
};

// Функция для персонализированных рекомендаций ("Для тебя")
export const getForYouContent = async (
  limit: number = 5,
): Promise<PlaylistType[]> => {
  // Используем топовые треки пользователя для создания рекомендаций
  const topTracksResponse = await api.get("/me/top/tracks", {
    params: { limit: 5 },
  });

  const seedTracks = topTracksResponse.data.items
    .map((track: TrackItemType) => track.id)
    .slice(0, 2)
    .join(",");

  const response = await api.get("/recommendations", {
    params: {
      seed_tracks: seedTracks,
      limit,
    },
  });
  // Получаем плейлисты, связанные с рекомендованными треками
  const trackIds = response.data.tracks.map((track: TrackItemType) => track.id);
  const playlistResponse = await api.get("/search", {
    params: {
      q: `track:${trackIds[0]}`,
      type: "playlist",
      limit,
    },
  });
  return playlistResponse.data.playlists.items;
};

// Функция для популярных плейлистов ("Популярное сейчас")
export const getPopularPlaylists = async (
  limit: number = 5,
): Promise<PlaylistType[]> => {
  const response = await api.get("/browse/featured-playlists", {
    params: { limit },
  });
  return response.data.playlists.items;
};

// Query Options для каждого типа данных
export const getRandomPlaylistsQueryOptions = (limit: number) =>
  queryOptions({
    queryKey: ["random-playlists", limit],
    queryFn: () => getRandomPlaylists(limit),
    initialData: [],
    refetchInterval: 1000 * 60 * 60 * 24, // 24 часа
  });

export const getRandomAlbumsQueryOptions = (limit: number) =>
  queryOptions({
    queryKey: ["random-albums", limit],
    queryFn: () => getRandomAlbums(limit),
    initialData: [],
    refetchInterval: 1000 * 60 * 60 * 24,
  });

export const getRandomArtistsQueryOptions = (limit: number) =>
  queryOptions({
    queryKey: ["random-artists", limit],
    queryFn: () => getRandomArtists(limit),
    initialData: [],
    refetchInterval: 1000 * 60 * 60 * 24,
  });

export const getNewReleasesQueryOptions = (limit: number) =>
  queryOptions({
    queryKey: ["new-releases", limit],
    queryFn: () => getNewReleases(limit),
    initialData: [],
    refetchInterval: 1000 * 60 * 60 * 24,
  });

export const getForYouQueryOptions = (limit: number) =>
  queryOptions({
    queryKey: ["for-you", limit],
    queryFn: () => getForYouContent(limit),
    initialData: [],
    refetchInterval: 1000 * 60 * 60 * 24,
  });

export const getPopularPlaylistsQueryOptions = (limit: number) =>
  queryOptions({
    queryKey: ["popular-playlists", limit],
    queryFn: () => getPopularPlaylists(limit),
    initialData: [],
    refetchInterval: 1000 * 60 * 60 * 24,
  });

// Хуки для использования в компонентах
type UseContentOptions = {
  limit?: number;
  queryConfig?: QueryConfig<any>;
};

export const useRandomPlaylists = ({
  limit = 50,
  queryConfig,
}: UseContentOptions) =>
  useQuery({
    ...getRandomPlaylistsQueryOptions(limit),
    ...queryConfig,
  });

export const useRandomAlbums = ({
  limit = 5,
  queryConfig,
}: UseContentOptions) =>
  useQuery({
    ...getRandomAlbumsQueryOptions(limit),
    ...queryConfig,
  });

export const useRandomArtists = ({
  limit = 5,
  queryConfig,
}: UseContentOptions) =>
  useQuery({
    ...getRandomArtistsQueryOptions(limit),
    ...queryConfig,
  });

export const useNewReleases = ({ limit = 5, queryConfig }: UseContentOptions) =>
  useQuery({
    ...getNewReleasesQueryOptions(limit),
    ...queryConfig,
  });

export const useForYouContent = ({
  limit = 5,
  queryConfig,
}: UseContentOptions) =>
  useQuery({
    ...getForYouQueryOptions(limit),
    ...queryConfig,
  });

export const usePopularPlaylists = ({
  limit = 5,
  queryConfig,
}: UseContentOptions) =>
  useQuery({
    ...getPopularPlaylistsQueryOptions(limit),
    ...queryConfig,
  });
