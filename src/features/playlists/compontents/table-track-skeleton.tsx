import SkeletonAvatar from "@/components/ui/skeleton/skeleton-avatar"
import SkeletonText from "@/components/ui/skeleton/skeleton-text"
import { TableCell, TableRow } from "@/components/ui/table/table"

export function TableTrackSkeleton() {
	return (
		<TableRow className="h-14 pointer-events-none">
			<TableCell className="">
				<SkeletonText size={"md"} className="w-4" type={"rounded-md"} />
			</TableCell>
			<TableCell className="flex items-center gap-2  ">
				<SkeletonAvatar variant={"track"} size={"md"} />
				<div>
					<SkeletonText size={"sm"} className="w-32 rounded-lg mb-2" />
					<SkeletonText size={"sm"} className="w-28 rounded-lg " />
				</div>
			</TableCell>
			<TableCell>
				<SkeletonText size={"sm"} className="w-28 rounded-lg " />
			</TableCell>
			<TableCell>
				<SkeletonText size={"sm"} className="w-28 rounded-lg " />
			</TableCell>
			<TableCell>
				<SkeletonText size={"sm"} className="w-10 ml-[auto] rounded-lg " />
			</TableCell>
		</TableRow>
	)
}
