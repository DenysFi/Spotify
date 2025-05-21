import CardCover from "@/components/ui/card-cover/card-cover";
import { useColor } from "@/hooks/use-color";
import { convertTime } from "@/utils/convert-time";
import { PlaylistHeaderSkeleton } from "./playlist-header-skeleton";

interface PlaylistHeaderProps {
  data: {
    label: string | undefined;
    image: string | undefined;
    name: string | undefined;
    description: string | undefined;
    display_name: string | undefined;
    total: number | undefined;
    totalDuration: number;
  };
  isLoading: boolean;
}

function PlaylistHeader({ data, isLoading }: PlaylistHeaderProps) {
  const [h, m, s] = convertTime(data.totalDuration);
  const bgColor = useColor(data.image);

  return !isLoading ? (
    <div className="relative flex h-[256px] gap-5 px-[var(--content-spacing)] py-4">
      <div
        className="item-top-header-bg"
        style={{ backgroundColor: bgColor }}
      ></div>
      <div className="shrink-0 overflow-hidden rounded">
        <CardCover
          size={"lg"}
          className="shadow-3xl select-none"
          imgSrc={data.image!}
        ></CardCover>
      </div>
      <div className="relative z-10 flex flex-col justify-end gap-1">
        <span className="text-sm font-semibold">{data.label}</span>
        <h2 className="text-xl font-extrabold @[800px]:text-4xl">
          {data.name}
        </h2>
        <p className="text-ellipsis-custom mb-2 text-sm text-white/70">
          {data.description}
        </p>
        <div className="text-sm font-normal">
          <span className="mr-1 font-extrabold">{data.display_name}</span>•{" "}
          {data.total} треков
          <span className="ml-1 text-white/70">
            {h} ч. {m} мин. {s} сек.
          </span>
        </div>
      </div>
    </div>
  ) : (
    <PlaylistHeaderSkeleton />
  );
}

export default PlaylistHeader;
