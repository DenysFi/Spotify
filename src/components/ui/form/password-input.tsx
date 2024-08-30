import { Eye, EyeOff } from "lucide-react"
import { forwardRef, useState } from "react"
import { Button } from "../button"
import Input, { type InputProps } from "./input"

type PasswordInputProps = Omit<InputProps, "icon">

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
	({ ...props }, forwardRef) => {
		const [type, setType] = useState("password")

		const isPassword = type === "password"

		const handleClick = () => {
			setType(isPassword ? "text" : "password")
		}

		const Icon = isPassword ? Eye : EyeOff

		return (
			<div>
				<Input
					label="Пароль"
					type={type}
					ref={forwardRef}
					{...props}
					icon={
						<Button
							variant="iconTransparent"
							className="p-0"
							onClick={handleClick}
							type="button"
							iconLeft={<Icon alignmentBaseline="middle" />}
						>
							<span className="sr-only">
								{isPassword ? "Show " : "Hide"} {" password"}
							</span>
						</Button>
					}
				/>
			</div>
		)
	}
)

PasswordInput.displayName = "PasswordInput"

export default PasswordInput
