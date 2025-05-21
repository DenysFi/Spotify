import { Button } from "@/components/ui/button";
import TracksTable from "@/features/playlists/compontents/tracks-table";
import { convertTime } from "@/utils/convert-time";
import { joinArtists } from "@/utils/tracks-utils";
import { Clock, Play } from "lucide-react";
import { useAlbum } from "../api/get-album";
import { useNavigate } from "react-router-dom";

function AlbumsTracks({ id }: { id: string }) {
  const { data, isLoading } = useAlbum({
    albumId: id,
  });

  const navigation = useNavigate();

  return (
    <div className="relative z-20 p-[var(--content-spacing)]" key={id}>
      <TracksTable
        isLoading={isLoading}
        data={data?.tracks.items}
        grid={"compact"}
        ids={data?.tracks.items.map((item) => item.id)}
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
            Cell: ({ entry: { name, artists } }) => {
              return (
                <div className="flex items-center gap-2">
                  <div>
                    <div className="text-ellipsis-custom leading-6">{name}</div>
                    <button
                      className="text-ellipsis-custom text-sm text-textButton hover:underline group-hover:text-white"
                      onClick={() => {
                        navigation(`/app/artist/${artists[0].id}`);
                      }}
                    >
                      {joinArtists(artists)}
                    </button>
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
  );
}

export default AlbumsTracks;
