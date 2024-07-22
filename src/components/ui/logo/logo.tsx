import { AudioLines } from "lucide-react";

function Logo({ color = "#1ED760" }: { color?: string }) {
  return <AudioLines color={color} size={"50px"} />;
}

export default Logo;
