import setFormData from "@/components/ui/stepper/services/setFormData"
import type { ILabel } from "@/constants/labels.constant"
import { cn } from "@/utils/cn"
import { FirebaseError } from "firebase/app"
import { useNavigate } from "react-router-dom"

interface AuthWithProps extends ILabel {
	className?: string
	type: "login" | "register"
}

function AuthWith({ iconSrc, label, action, type, className }: AuthWithProps) {
	const navigate = useNavigate()
	async function hanldeAuth() {
		try {
			const res = await action()

			if (type === "register") {
				setFormData({
					email: res.user.email!,
					username: res.user.displayName!,
				})

				navigate(".", { state: { step: 1, authWithService: true } })
			} else {
				navigate("/app")
			}
		} catch (error: unknown) {
			if (error instanceof FirebaseError) {
				console.error(error.customData)
			}
		}
	}

	return (
		<button
			onClick={hanldeAuth}
			aria-label={label}
			className={cn(
				"relative w-full flex items-center py-1.5 select-none pl-10 text-center pr-10 rounded-full border-[1px] justify-center border-white/50 hover:border-white",
				className
			)}
		>
			<div className="absolute left-4">
				<img src={iconSrc} alt={label} />
			</div>
			<span className="sm:ml-8 ml-1 text-base font-bold text-white">
				{type === "login" ? "Войдите" : "Зарегистрируйтесь"} {label}
			</span>
		</button>
	)
}

export default AuthWith
