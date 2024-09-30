import { FULL_MONTH } from "@/features/playlists/contants";
import type { AlbumCopyType } from "../api/get-album";

function AlbumCopy({
  releaseDate,
  copyrights,
}: {
  releaseDate: string | undefined;
  copyrights: AlbumCopyType[] | undefined;
}) {
  const [year, month, day] = releaseDate?.split("-") || [];
  return (
    <>
      <div />
      <p className="text-sm text-textButton">
        {day} {FULL_MONTH[+month]} {year} г.
      </p>
      <div></div>
      {copyrights &&
        copyrights.map((r) => (
          <p key={r.text + r.type} className="text-[0.68rem] text-textButton">
            {r.text}
          </p>
        ))}
    </>
  );
}

export default AlbumCopy;
