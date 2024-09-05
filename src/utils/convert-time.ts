export function convertTime(ms: number | string) {
	if (typeof ms === "string") {
		ms = parseInt(ms)
	}

	const h = Math.floor(ms / 1000 / 60 / 60)
	const m = Math.floor((ms / 1000 / 60 / 60 - h) * 60)
	const s = Math.floor(((ms / 1000 / 60 / 60 - h) * 60 - m) * 60)

	return [h, m, s]
}
