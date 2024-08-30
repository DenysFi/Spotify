import { cn } from "@/utils/cn"
import * as DropdownPrimitive from "@radix-ui/react-dropdown-menu"
import {
	forwardRef,
	type ComponentPropsWithoutRef,
	type ElementRef,
} from "react"

const Dropdown = DropdownPrimitive.Root
const DropdownTrigger = DropdownPrimitive.Trigger

const DropdownContent = forwardRef<
	ElementRef<typeof DropdownPrimitive.Content>,
	ComponentPropsWithoutRef<typeof DropdownPrimitive.Content>
>(({ className, ...rest }, ref) => {
	return (
		<DropdownPrimitive.Portal>
			<DropdownPrimitive.Content
				className={cn(className, "bg-[#282828] p-1 min-w-48 rounded-sm ")}
				ref={ref}
				{...rest}
			/>
		</DropdownPrimitive.Portal>
	)
})

DropdownContent.displayName = DropdownPrimitive.Content.displayName

const DropdownItem = forwardRef<
	ElementRef<typeof DropdownPrimitive.Item>,
	ComponentPropsWithoutRef<typeof DropdownPrimitive.Item>
>(({ children, className, ...rest }, ref) => {
	return (
		<DropdownPrimitive.Item
			className={cn(
				className,
				"cursor-pointer hover:bg-[#3E3E3E] transition-colors bg-transparent w-full text-white py-2 pl-2 pr-1"
			)}
			ref={ref}
			{...rest}
		>
			{children}
		</DropdownPrimitive.Item>
	)
})
DropdownItem.displayName = DropdownPrimitive.Item.displayName

export { Dropdown, DropdownContent, DropdownItem, DropdownTrigger }
