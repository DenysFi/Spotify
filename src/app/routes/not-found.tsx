import { Button } from "@/components/ui/button"
import Logo from "@/components/ui/logo/logo"

export function NotFoundRoute() {
	return (
		<section className="w-screen h-screen flex items-center justify-center flex-col bg-primaryBg">
			<div>
				<Logo />
			</div>
			<div className="my-6 text-center">
				<h1 className="text-white font-bold text-5xl mb-4">
					Страница не найдена
				</h1>
				<p className="text-[#a7a7a7] text-2xl  mb-10">
					Мы не нашли нужную страницу
				</p>
				<Button
					onClick={() => window.location.assign(window.location.origin)}
					variant={"pillFilled"}
					size={"lg"}
					hover={"pulse"}
				>
					На главную
				</Button>
			</div>
		</section>
	)
}
