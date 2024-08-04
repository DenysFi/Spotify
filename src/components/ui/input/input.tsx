import { forwardRef, type InputHTMLAttributes } from "react"
import { cn } from "@/utils/cn"
import { cva, type VariantProps } from "class-variance-authority"

const inputVariants = cva(
	"relative rounded-md border-mainGray placeholder-mainGray transition-colors text-mainGray font-bold  bg-[#2A2A2A] focus:border-white    focus:outline-1",
	{
		variants: {
			inputSize: {
				sm: "py-2 pl-8 h-8 text-xs",
				md: "py-2 px-8 h-10 text-sm",
			},
		},
		defaultVariants: { inputSize: "md" },
	}
)

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
	VariantProps<typeof inputVariants>
const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, inputSize, ...props }, ref) => {
		return (
			<>
				<input
					ref={ref}
					className={cn(inputVariants({ inputSize, className }))}
					{...props}
				/>
			</>
		)
	}
)

export default Input
