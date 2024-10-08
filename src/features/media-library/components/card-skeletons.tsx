import { useSidebar } from "@/components/ui/sidebar/context/useSidebar.hook"
import { SidebarItemHided } from "@/components/ui/sidebar/sidebar"
import SkeletonAvatar from "@/components/ui/skeleton/skeleton-avatar"
import SkeletonText from "@/components/ui/skeleton/skeleton-text"
import { cn } from "@/utils/cn"

function CardSkeletons({ count }: { count: number }) {
	const skeletons = Array.from({ length: count + 1 })
	const { expanded } = useSidebar()

	return skeletons.map((_, i) => (
		<li
			key={i}
			className={cn("flex gap-2 relative py-2", {
				"justify-center": !expanded,
			})}
			aria-label="card item loading"
		>
			<SkeletonAvatar className="shrink-0" />
			<SidebarItemHided>
				<div className="w-full flex flex-col  justify-center">
					<SkeletonText size={"md"} className="mb-2 w-[70%]" />
					<SkeletonText className="w-[55%]" />
				</div>
			</SidebarItemHided>
		</li>
	))
}

export default CardSkeletons
