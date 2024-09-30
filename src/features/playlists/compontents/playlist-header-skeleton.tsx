import SkeletonAvatar from "@/components/ui/skeleton/skeleton-avatar";
import SkeletonText from "@/components/ui/skeleton/skeleton-text";

export function PlaylistHeaderSkeleton() {
  return (
    <div className="relative flex gap-5 px-[var(--content-spacing)] py-4">
      <div
        className="item-top-header-bg"
        style={{ backgroundColor: "rgba(0, 0, 0, .5)" }}
      ></div>

      <SkeletonAvatar className="shrink-0 rounded" size={"lg"} />
      <div className="relative z-10 flex w-full flex-col justify-end gap-1">
        <SkeletonText className="mb-3 w-[20%]" />
        <SkeletonText className="mb-1 w-[50%]" size={"md"} />
        <SkeletonText className="mb-4 w-[70%]" />
        <SkeletonText className="w-[40%]" />
      </div>
    </div>
  );
}
