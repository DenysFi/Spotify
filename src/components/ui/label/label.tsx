import { cn } from "@/utils/cn";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const LabelVariants = cva("text-white text-sm h-fit", {
  variants: {
    variant: {
      field: "font-bold ",
      radio: "font-normal",
    },
  },
  defaultVariants: {
    variant: "field",
  },
});

const Label = forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof LabelVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <LabelPrimitive.Root
      className={cn(LabelVariants({ variant }), className)}
      {...props}
      ref={ref}
    />
  );
});
Label.displayName = LabelPrimitive.Root.displayName;
export default Label;
