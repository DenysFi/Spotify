import SkeletonAvatar from "@/components/ui/skeleton/skeleton-avatar"
import SkeletonText from "@/components/ui/skeleton/skeleton-text"

export function PlaylistHeaderSkeleton() {
	return (
		<div className=" px-[var(--content-spacing)] flex py-4  gap-5 relative">
			<div
				className="item-top-header-bg"
				style={{ backgroundColor: "rgba(0, 0, 0, .5)" }}
			></div>

			<SkeletonAvatar className="rounded shrink-0" size={"lg"} />
			<div className=" relative z-10 flex flex-col justify-end gap-1 w-full">
				<SkeletonText className="w-[20%] mb-3" />
				<SkeletonText className="w-[50%] mb-1" size={"md"} />
				<SkeletonText className="w-[70%] mb-4" />
				<SkeletonText className="w-[40%]  " />
			</div>
		</div>
	)
}
