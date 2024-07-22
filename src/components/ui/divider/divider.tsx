import { cn } from "@/utils/cn";
import React from "react";

function Divider({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "min-h-[1px] w-full relative content-none before:content before:absolute before:w-full before:h-[1px]",
        "before:left-0 before:top-[50%] before:bg-white/50 text-white text-center",
        className
      )}
    >
      {children && (
        <span className="relative px-3 bg-primaryBg z-10">{children}</span>
      )}
    </div>
  );
}

export default Divider;
