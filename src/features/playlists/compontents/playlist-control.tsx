import { Button } from "@/components/ui/button"
import { List, Play } from "lucide-react"

function PlaylistControl() {
	return (
		<div className="relative p-[var(--content-spacing)] z-10 flex justify-between gap-2 items-center">
			<Button
				className="w-12 h-12 bg-green-color"
				variant={"icon"}
				size={"icon"}
				hover={"pulse"}
			>
				<Play size={32} color="#000000" fill="black" width={24} height={24} />
			</Button>

			<Button variant={"text"} iconRight={<List width={16} height={16} />}>
				Список
			</Button>
		</div>
	)
}

export default PlaylistControl
