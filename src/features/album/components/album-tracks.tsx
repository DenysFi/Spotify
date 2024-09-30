import { Button } from "@/components/ui/button"
import TracksTable from "@/features/playlists/compontents/tracks-table"
import { convertTime } from "@/utils/convert-time"
import { joinArtists } from "@/utils/tracks-utils"
import { Clock, Play } from "lucide-react"
import { useAlbum } from "../api/get-album"

function AlbumsTracks({ id }: { id: string }) {
	const { data, isLoading } = useAlbum({
		albumId: id,
	})

	return (
		<div className="p-[var(--content-spacing)] " key={id}>
			<TracksTable
				isLoading={isLoading}
				data={data?.tracks.items}
				grid={"compact"}
				ids={data?.tracks.items.map(item => item.id)}
				columns={[
					{
						title: "#",
						field: "#",
						Cell: ({ index }) => {
							return (
								<>
									<span className="group-hover:hidden absolute right-1 top-[50%] translate-y-[-50%] pointer-events-none">
										{index + 1}
									</span>
									<Button
										className="group-hover:block hidden "
										variant={"iconTransparent"}
										size={"icon"}
									>
										<Play
											width={"16"}
											height={"16"}
											fill="white"
											stroke="white"
										/>
									</Button>
								</>
							)
						},
					},
					{
						title: "Название",
						field: "track",
						Cell: ({ entry: { name, artists } }) => {
							return (
								<div className="flex items-center gap-2 ">
									<div>
										<div className="leading-6 text-ellipsis-custom">{name}</div>
										<a
											className="hover:underline text-sm text-textButton group-hover:text-white text-ellipsis-custom"
											href="#"
										>
											{joinArtists(artists)}
										</a>
									</div>
								</div>
							)
						},
					},
					{
						title: <Clock className="text-textButton h-4 w-4" />,
						field: "duration_ms",
						Cell: ({ entry: { duration_ms } }) => {
							const [_, m, s] = convertTime(duration_ms)

							return (
								<span className="text-sm text-textButton">
									{m}:{s.toString().padStart(2, "0")}
								</span>
							)
						},
					},
				]}
			/>
		</div>
	)
}

export default AlbumsTracks
