import React, { type PropsWithChildren } from "react"
import Head from "../seo/head"
import Logo from "../ui/logo/logo"
import { cn } from "@/utils/cn"

interface AuthLayoutProps extends PropsWithChildren {
	type: "login" | "registrate"
}

function Header() {
	return (
		<div className="pt-8 pb-6">
			<Logo color="white" />
		</div>
	)
}

function AuthLayout({ children, type }: AuthLayoutProps) {
	const headTitle = type.charAt(0).toUpperCase() + type.slice(1)
	const isLogin = type === "login"

	return (
		<section
			className={cn("h-full  w-full bg-primaryBg flex flex-col items-center ", {
				"mdmobile:bg-primaryBgGradient mdmobile:p-8": isLogin,
			})}
		>
			<Head title={`${headTitle} | Spotify`} />
			{!isLogin && (
				<>
					<Header />
					{children}
				</>
			)}

			{isLogin && (
				<div className="max-w-[45em] w-full bg-primaryBg flex flex-col items-center mdmobile:rounded-lg pb-8 px-4">
					<Header />
					{children}
				</div>
			)}
		</section>
	)
}

export default AuthLayout
