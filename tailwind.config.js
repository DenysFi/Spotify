import containerPlugin from "@tailwindcss/container-queries"

/** @type {import('tailwindcss').Config} */

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

	theme: {
		screens: {
			mobile: "480px",
			mdmobile: "747px",
		},
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			fontFamily: {
				nunito: ["Nunito", "sans-serif"],
			},
			backgroundImage: {
				primaryBgGradient:
					"linear-gradient(rgba(255, 255, 255, 0.1) 0%, rgb(0, 0, 0) 100%)",
			},
			colors: {
				ring: "var(--ring)",
				primaryBg: "var(--primary-bg)",
				"green-color": "var(--green)",
				mainGray: "var(--main-gray)",
				secondaryGray: "var(--secondary-gray)",
				iconPrimaryHover: "hsl(var(--icon-primary-foreground))",
				iconSecondaryHover: "hsl(var(--icon-secondary-foreground))",
				iconBgHover: "hsl(var(--icon-foreground))",

				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				textButton: {
					DEFAULT: "hsl(var(--text-button))",
					hover: "hsl(var(--text-button-hover))",
				},
			},
			keyframes: {
				"select-down": {
					from: { height: "0" },
					to: { height: "var(--radix-select-content-available-height)" },
				},
				"select-up": {
					from: { height: "var(--radix-select-content-available-height)" },
					to: { height: "0" },
				},
				tooltipFade: {
					from: { opacity: "0" },
					to: { opacity: "1" },
				},
			},
			animation: {
				tooltipFade: "tooltipFade 0.4s ease-out",
				"select-down": "select-down 0.2s ease-out",
				"select-up": "select-up 0.2s ease-out",
			},
		},
	},
	plugins: [import("tailwindcss-animate"), containerPlugin],
}
