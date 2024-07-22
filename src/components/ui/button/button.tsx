import { cn } from "@/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import Spinner from "../spinner/spinner";

const buttonVariants = cva(
  "disabled:pointer-events-none disabled:opacity-50 inline-flex gap-2 items-center overflow-hidden justifu-center transition-colors font-bold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap ",
  {
    variants: {
      variant: {
        default: "text-primary-foreground bg-primary ",
        pillFilled: "text-secondary-foreground bg-secondary ",
        text: "text-textButton bg-transparent hover:text-textButton-hover",
        icon: "text-textButton bg-primary hover:text-textButton-hover",
        iconTransparent:
          "text-textButton bg-transparent hover:text-textButton-hover ",
      },
      size: {
        sm: "h-8 rounded-full px-4 py-1 text-sm ",
        lg: "h-10 rounded-full px-2 py-1 text-base",
        icon: "w-8 h-8 rounded-full flex items-center justify-center",
      },
      hover: {
        pulse: "hover:scale-105",
        iconPrimaryHover: "hover:bg-iconPrimaryHover",
        iconSecondaryHover: "hover:bg-iconSecondaryHover",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      hover,
      asChild = false,
      children,
      isLoading,
      iconLeft,
      iconRight,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, hover, className }))}
        ref={ref}
        {...props}
      >
        {iconLeft && !isLoading && <span>{iconLeft}</span>}
        {isLoading && (
          <div className="mr-2">
            <Spinner size="sm" variant="dark" />
          </div>
        )}
        {children}
        {iconRight && !isLoading && <span>{iconRight}</span>}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
