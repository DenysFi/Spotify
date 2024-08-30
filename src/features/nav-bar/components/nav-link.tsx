import {
	NavLink as RouterNavLink,
	type NavLinkProps as RouterNavLinkProps,
} from "react-router-dom"

import { forwardRef, type ReactNode } from "react"
import { buttonVariants } from "../../../components/ui/button"

import { cn } from "@/utils/cn"
import type { VariantProps } from "class-variance-authority"

export type NavLinkProps = RouterNavLinkProps &
	VariantProps<typeof buttonVariants> & {
		icon?: ReactNode
		children?: ReactNode
	}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
	(
		{ className, size, variant, hover, children = null, icon = null, ...props },
		ref
	) => {
		return (
			<RouterNavLink
				ref={ref}
				// tabIndex={1}
				className={({ isActive }) =>
					cn(
						buttonVariants({ size, variant, hover, className }),
						"font-extrabold ",
						{ "text-white": isActive }
					)
				}
				{...props}
			>
				<span className="flex gap-4">
					{icon}
					{children}
				</span>
			</RouterNavLink>
		)
	}
)

export default NavLink
