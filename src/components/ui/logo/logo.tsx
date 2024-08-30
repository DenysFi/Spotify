import { cn } from "@/utils/cn"
import { AudioLines } from "lucide-react"

function Logo({
	className,
	color = "#1ED760",
}: {
	className?: string
	color?: string
}) {
	return <AudioLines className={cn(className)} color={color} size={"50px"} />
}

export default Logo
