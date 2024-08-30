import { useParams } from "react-router-dom"
import { usePlaylist } from "../api/get-playlist"
import CardCover from "@/components/ui/card-cover/card-cover"
import { useColor } from "@/hooks/use-color"
import { Button } from "@/components/ui/button"
import { List, Play } from "lucide-react"
import TracksTable from "./tracks-table"

function PlaylistView() {
	const { playlistId } = useParams()

	const query = usePlaylist({ playlistId: playlistId ?? "" })
	const playlistData = query.data

	const bgColor = useColor(query.data?.images[0]?.url || "")

	console.log(playlistData?.tracks.items)

	const tracksTotalDurationMs =
		query.data?.tracks.items.reduce(
			(acc, item) => (acc += +item.track.duration_ms),
			0
		) || 0

	const h = Math.floor(tracksTotalDurationMs / 1000 / 60 / 60)
	const m = Math.floor((tracksTotalDurationMs / 1000 / 60 / 60 - h) * 60)
	const s = Math.floor(
		((tracksTotalDurationMs / 1000 / 60 / 60 - h) * 60 - m) * 60
	)

	const columns = [
		{
			title: "#",
			field: "#",
			Cell: ({ entry: { track_number } }) => {
				return null
			},
		},
	]

	return (
		<section className="@container relative	">
			<div className=" px-[var(--content-spacing)] flex py-4  gap-5 relative">
				<div
					className="item-top-header-bg"
					style={{ backgroundColor: bgColor }}
				></div>
				<div className="rounded overflow-hidden shrink-0">
					<CardCover
						size={"lg"}
						className="shadow-3xl select-none "
						imgSrc={query.data?.images[0]?.url || ""}
					></CardCover>
				</div>
				<div className=" relative z-10 flex flex-col justify-end gap-1 ">
					<span className="  text-sm font-semibold ">Плейлист</span>
					<h2 className="@[800px]:text-3xl text-xl font-extrabold ">
						{playlistData?.name}
					</h2>
					<p className="text-white/70 text-sm mb-2 text-ellipsis-custom">
						{playlistData?.description}
					</p>
					<div className="text-sm font-semibold">
						<span className="font-extrabold mr-1">
							{playlistData?.owner.display_name}
						</span>
						• {playlistData?.tracks.total} треков
						<span className="text-white/70 ml-1">
							{h} ч. {m} мин. {s} сек.
						</span>
					</div>
				</div>
			</div>
			<div className=" relative">
				<div
					className="absolute left-0 top-0 w-full h-[14.5rem] tracks-bg"
					style={{ backgroundColor: bgColor }}
				></div>
				<div className="relative p-[var(--content-spacing)] z-10 flex justify-between gap-2 items-center">
					<Button
						className="w-12 h-12 bg-green-color"
						variant={"icon"}
						size={"icon"}
						hover={"pulse"}
					>
						<Play
							size={32}
							color="#000000"
							fill="black"
							width={24}
							height={24}
						/>
					</Button>

					<Button variant={"text"} iconRight={<List width={16} height={16} />}>
						Список
					</Button>
				</div>
				<div className="p-[var(--content-spacing)] ">
					<TracksTable data={playlistData?.tracks.items}></TracksTable>
				</div>
			</div>
		</section>
	)
}

export default PlaylistView
