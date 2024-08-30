import type { TCardVariantsEnum } from "./get-text-by-type"

export function saveToRecentlyListened(item: {
	id: string
	type: TCardVariantsEnum
}) {
	const recentlyListened = getRecentlyListened()

	const currentList = recentlyListened[item.type] || []

	const newRecentlyListened = {
		...recentlyListened,
		[item.type]: [...currentList, item.id],
	}

	localStorage.setItem("recentlyListened", JSON.stringify(newRecentlyListened))
}
type GetRecentlyListenedReturn = {
	[key in TCardVariantsEnum]: string[]
}
export function getRecentlyListened(): GetRecentlyListenedReturn {
	return JSON.parse(localStorage.getItem("recentlyListened") || "{}")
}

export function clearRecentlyListened() {
	localStorage.removeItem("recentlyListened")
}

clearRecentlyListened()

saveToRecentlyListened({
	id: "2noRn2Aes5aoNVsU6iWThc",
	type: "album",
})

saveToRecentlyListened({
	id: "1A2GTWGtFfWp7KSQTwWOyo",
	type: "album",
})

saveToRecentlyListened({
	id: "01lZudgXsojt5TBHuygB8r",
	type: "artist",
})

saveToRecentlyListened({
	id: "5ySBdOIQPpfpCO75lu20Uq",
	type: "playlist",
})
