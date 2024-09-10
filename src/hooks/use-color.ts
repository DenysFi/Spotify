import { useState, useEffect } from "react"

export const useColor = (url: string | undefined = ""): string => {
	const [color, setColor] = useState<string>("")

	function loadImage(src: string): Promise<HTMLImageElement> {
		return new Promise((resolve, reject) => {
			const img = new Image()
			img.addEventListener("load", () => {
				resolve(img)
			})
			img.addEventListener("error", reject)
			img.src = src
			img.crossOrigin = "Anonymous"
		})
	}

	function analyzeImage(img: HTMLImageElement) {
		const { width, height } = img

		const canvas = document.createElement("canvas")

		canvas.height = height
		canvas.width = width

		const context = canvas.getContext("2d", { willReadFrequently: true })

		if (context === null) {
			return
		}

		context.imageSmoothingEnabled = true
		context.drawImage(img, 0, 0)

		const [r, g, b] = context.getImageData(0, 0, 1, 1).data.slice(0, 3)
		setColor(`rgb(${r},${g},${b})`)
	}

	useEffect(() => {
		if (!url) return

		loadImage(url).then(analyzeImage)
	}, [url])

	return color
}
