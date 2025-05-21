import CardСover from "../card-cover/card-cover";

function CardItem({
  onCLick,
  item,
  variant = "playlist",
}: {
  item: { imageSrc: string; name: string; subText: string };
  onCLick: () => void;
  variant?: string;
}) {
  return (
    <article className="h-fit-content" onClick={onCLick}>
      <div className="flex h-full cursor-pointer flex-col rounded-md p-3 transition-colors hover:bg-iconPrimaryHover">
        <CardСover
          variant={variant as "artist" | "playlist" | "album"}
          imgSrc={item.imageSrc}
          size={"lg"}
          className="h-[60%] shrink-0"
        />
        <div className="mt-4 max-w-40">
          <h4 className="text-md text-ellipsis-custom-2 font-medium">
            {item.name}
          </h4>
          <p
            className="break-word text-ellipsis-custom pt-1.5 text-sm text-textButton"
            dangerouslySetInnerHTML={{ __html: item.subText }}
          ></p>
        </div>
      </div>
    </article>
  );
}

export default CardItem;
