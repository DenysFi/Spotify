import { cn } from "@/utils/cn";
import * as RadioGroup from "@radix-ui/react-radio-group";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HtmlHTMLAttributes,
} from "react";
import Label from "../label/label";
import { Controller, useFormContext } from "react-hook-form";

const Radio = RadioGroup.Root;

type RadioControlledProps = ComponentPropsWithoutRef<typeof Radio> & {
  name: string;
};

export const RadioControlled = ({
  name,
  children,
  className,
  ...props
}: RadioControlledProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Radio
          {...field}
          {...props}
          className={className}
          onValueChange={field.onChange}
        >
          {children}
        </Radio>
      )}
    />
  );
};

const RadioItem = forwardRef<
  ElementRef<typeof RadioGroup.Item>,
  ComponentPropsWithoutRef<typeof RadioGroup.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroup.Item
      ref={ref}
      className={cn(
        "data-[state=checked]:bg-green-color border border-mainGray w-4 h-4 rounded-full relative transition-colors cursor-pointer hover:border-green-color",
        className
      )}
      {...props}
    >
      <RadioGroup.Indicator className="flex items-center justify-center w-full  h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-[50%] after:bg-primaryBg" />
    </RadioGroup.Item>
  );
});

RadioItem.displayName = "RadioItem";

const RadioLabel = forwardRef<
  ElementRef<typeof Label>,
  ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  return (
    <Label
      ref={ref}
      variant="radio"
      className={cn(
        "text-white leading-none cursor-pointer select-none",
        className
      )}
      {...props}
    />
  );
});

RadioLabel.displayName = "RadioLabel";

const RadioWrapper = ({
  children,
  className,
  ...props
}: HtmlHTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("flex items-center gap-4", className)} {...props}>
      {children}
    </div>
  );
};

RadioWrapper.displayName = "RadioWrapper";

export { Radio, RadioItem, RadioLabel, RadioWrapper };
