import React, { forwardRef, type InputHTMLAttributes } from "react"
import FieldWrapper, {
	type FieldWrapperPassThroughProps,
} from "./field-wrapper"
import { cn } from "@/utils/cn"
import type { UseFormRegisterReturn } from "react-hook-form"

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
	FieldWrapperPassThroughProps & {
		icon?: React.ReactNode
		sublabel?: string
		wrapperDisabled?: boolean
		registration: Partial<UseFormRegisterReturn>
		showError?: boolean
	}

const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			label,
			sublabel,
			wrapperDisabled = false,
			className,
			icon = null,
			registration,
			errors,
			showError = true,
			...props
		},
		ref
	) => {
		const input = (
			<>
				<input
					aria-invalid={!!errors}
					ref={ref}
					className={cn(
						"py-2.5 px-4 border border-mainGray box-border hover:border-white transition-colors focus:border-white focus:outline-1  ",
						"rounded-md bg-primaryBg w-full text-white placeholder-mainGray transition-colors",
						{ "pr-10": icon },
						{
							"border-red-500  focus:!border-red-500 hover:border-red-500    focus:!ring-red-600 ":
								!!errors,
						},
						className
					)}
					{...props}
					{...registration}
				/>
				{icon && (
					<span className="absolute right-2 top-[50%] translate-y-[-50%]">
						{icon}
					</span>
				)}
			</>
		)

		return wrapperDisabled ? (
			input
		) : (
			<FieldWrapper
				showError={showError}
				errors={errors}
				label={label}
				sublabel={sublabel}
			>
				{input}
			</FieldWrapper>
		)
	}
)
export default Input
