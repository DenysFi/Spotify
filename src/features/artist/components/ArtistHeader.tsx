
import CardCover from "@/components/ui/card-cover/card-cover";
import { useColor } from "@/hooks/use-color";
import { useRecentlyListened } from "@/utils/recently-listened-context";
import { SubscribeButton } from "@/features/subscriptions/components/SubscribeButton";

interface ArtistHeaderProps {
  data: {
    image: string | undefined;
    name: string | undefined;
    popularity: number | undefined;
    followers: number | undefined;
    genres: string[] | undefined;
  };
  id: string;
  isLoading: boolean;
}

function ArtistHeader({ data, isLoading, id }: ArtistHeaderProps) {
  const bgColor = useColor(data.image);
  const { addToRecentlyListened } = useRecentlyListened();
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
          variant={"artist"}
          imgSrc={data.image!}
        ></CardCover>
      </div>
      <div className="relative z-10 flex w-full flex-col justify-end gap-1">
        <div className="flex justify-between">
          <div className="mt-auto">
            <h2 className="text-xl font-extrabold @[800px]:text-4xl">
              {data.name}
            </h2>
            {(data.genres?.length && (
              <p className="text-ellipsis-custom text-sm text-white/70">
                Жанры: {data.genres?.join(", ")}
              </p>
            )) ||
              ""}
            <p className="text-ellipsis-custom text-sm text-white/70">
              Популярность: {data.popularity?.toLocaleString("ru-RU")}{" "}
            </p>
            <p className="text-ellipsis-custom mb-2 text-sm text-white/70">
              Подписчики: {data.followers?.toLocaleString("ru-RU")}{" "}
            </p>
          </div>
          <div className="mb-4 mt-auto">
            <SubscribeButton 
              itemId={id}
              itemType="artist"
              size="icon"
              className="h-12 w-12 bg-green-color"
              onClick={() => {
                addToRecentlyListened(id, "artist");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
export default ArtistHeader;
