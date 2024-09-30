import CardCover from "@/components/ui/card-cover/card-cover"
import { useColor } from "@/hooks/use-color"
import { convertTime } from "@/utils/convert-time"
import { PlaylistHeaderSkeleton } from "./playlist-header-skeleton"

interface PlaylistHeaderProps {
	data: {
		label: string | undefined
		image: string | undefined
		name: string | undefined
		description: string | undefined
		display_name: string | undefined
		total: number | undefined
		totalDuration: number
	}
	isLoading: boolean
}

function PlaylistHeader({ data, isLoading }: PlaylistHeaderProps) {
	const [h, m, s] = convertTime(data.totalDuration)
	const bgColor = useColor(data.image)

	return !isLoading ? (
		<div className=" px-[var(--content-spacing)] flex py-4  gap-5 relative h-[256px]">
			<div
				className="item-top-header-bg"
				style={{ backgroundColor: bgColor }}
			></div>
			<div className="rounded overflow-hidden shrink-0">
				<CardCover
					size={"lg"}
					className="shadow-3xl select-none "
					imgSrc={data.image!}
				></CardCover>
			</div>
			<div className=" relative z-10 flex flex-col justify-end gap-1 ">
				<span className="  text-sm font-semibold ">{data.label}</span>
				<h2 className="@[800px]:text-4xl text-xl font-extrabold ">
					{data.name}
				</h2>
				<p className="text-white/70 text-sm mb-2 text-ellipsis-custom">
					{data.description}
				</p>
				<div className="text-sm font-normal">
					<span className="font-extrabold mr-1">{data.display_name}</span>•{" "}
					{data.total} треков
					<span className="text-white/70 ml-1">
						{h} ч. {m} мин. {s} сек.
					</span>
				</div>
			</div>
		</div>
	) : (
		<PlaylistHeaderSkeleton />
	)
}

export default PlaylistHeader
