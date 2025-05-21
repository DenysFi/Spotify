// Import Swiper styles
import { useNavigate } from "react-router-dom";
import "swiper/css";
import {
  useNewReleases,
  useRandomAlbums,
  useRandomArtists,
  useRandomPlaylists,
} from "./api/recommendations";
import RecSkeleton from "./RecSkeleton";
import Slider from "./Slider";

function formatDate(isoDate: string) {
  const date = new Date(isoDate);

  // Форматируем день и год
  const day = date.getDate();
  const year = date.getFullYear();

  // Форматируем месяц на русском
  const month = date.toLocaleDateString("ru-RU", { month: "long" });

  const monthWithoutEnding =
    month === "март"
      ? "марта"
      : month === "август"
        ? "августа"
        : month.slice(0, month.length - 1) + "я";

  return `${day} ${monthWithoutEnding} • ${year}`;
}

function Recommendations() {
  const navigate = useNavigate();

  const { data: playlistsRaw, isFetching: isLoading1 } = useRandomPlaylists({
    limit: 5,
  });
  const { data: albumsRaw, isFetching: isLoading2 } = useRandomAlbums({
    limit: 15,
  });
  const { data: artistsRaw, isFetching: isLoading3 } = useRandomArtists({
    limit: 10,
  });
  const { data: newReleasesRaw, isFetching: isLoading4 } = useNewReleases({
    limit: 20,
  });

  const isLoading =
    isLoading1 ||
    isLoading2 ||
    isLoading3 ||
    isLoading4 ||
    playlistsRaw === undefined ||
    albumsRaw === undefined ||
    artistsRaw === undefined ||
    newReleasesRaw === undefined;

  const playlists = playlistsRaw?.map((playlist) => ({
    id: playlist.id,
    title: playlist.name,
    imageSrc: playlist.images[0]?.url,
    supportingText: playlist.description,
    type: "playlist",
  }));

  const albums = albumsRaw?.map((album) => ({
    id: album.id,
    title: album.name,
    imageSrc: album.images[0]?.url,
    supportingText: formatDate(album.release_date),
    type: "album",
  }));

  const artists = artistsRaw?.map((artist) => ({
    id: artist.id,
    title: artist.name,
    imageSrc: artist.images[0]?.url,
    supportingText: artist.genres.join(", "),
    type: "artist",
  }));

  const newReleases = newReleasesRaw?.map((album) => ({
    id: album.id,
    title: album.name,
    imageSrc: album.images[0]?.url,
    supportingText: formatDate(album.release_date),
    type: "album",
  }));

  if (isLoading) {
    return <RecSkeleton />;
  }

  return (
    <section className="p-[var(--content-spacing)] @container">
      <Slider
        data={playlists}
        onClick={({ type, id }) => {
          navigate(`./${type}/${id}`);
        }}
        title="Рекомендации"
      />
      <Slider
        data={albums}
        onClick={({ type, id }) => {
          navigate(`./${type}/${id}`);
        }}
        title="Альбомы"
        className="mt-5"
      />
      <Slider
        data={newReleases}
        onClick={({ type, id }) => {
          navigate(`./${type}/${id}`);
        }}
        title="Новые релизы"
        className="mt-5"
      />
      <Slider
        data={artists}
        onClick={({ type, id }) => {
          navigate(`./${type}/${id}`);
        }}
        title="Артисты"
        className="mt-5"
      />
    </section>
  );
}

export default Recommendations;
