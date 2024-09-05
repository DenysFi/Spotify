import { Button } from "@/components/ui/button"

export function ContentNotFound() {
	return (
		<section className="w-full h-full flex items-center justify-center flex-col bg-primaryBg">
			<div className="my-6 text-center">
				<h2 className="text-white font-bold text-3xl mb-4">Произошла ошибка</h2>
				<p className="text-[#a7a7a7] text-xl  mb-10">
					Мы не нашли нужный контент
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
