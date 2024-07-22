import React, {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/utils/cn";
import { ChevronDown } from "lucide-react";

const Select = SelectPrimitive.Root;

const SelectValue = SelectPrimitive.Value;

const SelectPortal = SelectPrimitive.Portal;

const SelectGroup = SelectPrimitive.Group;

const SelectTrigger = forwardRef<
  ElementRef<typeof SelectPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    isError: boolean;
  }
>(({ className, isError, children, ...props }, ref) => {
  return (
    <SelectPrimitive.Trigger
      aria-invalid={isError}
      className={cn(
        "[&[data-placeholder]]:text-mainGray [&[data-state=open]>span:last-child]:rotate-180 py-2.5 px-3 border mobile:max-w-[9.3rem] ",
        "w-full transition-colors text-sm items-center inline-flex justify-between border-mainGray box-border hover:border-white  focus:border-white  rounded-md bg-primaryBg  text-white placeholder-mainGray",
        { "hover:border-red-500 border-red-500": isError },
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
      <SelectIcon
        className=" transition-transform duration-300 ease-in-out "
        asChild
      >
        <ChevronDown />
      </SelectIcon>
    </SelectPrimitive.Trigger>
  );
});

SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectLabel = forwardRef<
  ElementRef<typeof SelectPrimitive.Label>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => {
  return (
    <SelectPrimitive.Label
      ref={ref}
      className={cn("px-3 text-xs leading-[25px] text-mainGray", className)}
      {...props}
    />
  );
});

SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectIcon = forwardRef<
  ElementRef<typeof SelectPrimitive.Icon>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Icon>
>(({ className, ...props }, ref) => {
  return (
    <SelectPrimitive.Icon
      ref={ref}
      className={cn("text-mainGray ", className)}
      {...props}
    />
  );
});

SelectIcon.displayName = SelectPrimitive.Icon.displayName;

const SelectContent = forwardRef<
  ElementRef<typeof SelectPrimitive.Content>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ children, className, ...props }, ref) => {
  return (
    <SelectPortal>
      <SelectPrimitive.Content
        className={cn(
          "overflow-hidden bg-primaryBg py-2 border border-mainGray w-full min-w-[var(--radix-select-trigger-width)] ",
          "[&[data-side=bottom]]:rounded-b-md [&[data-side=bottom]]:border-t-0 [&[data-side=top]]:rounded-t-md [&[data-side=top]]:border-b-0",
          className
        )}
        {...props}
        ref={ref}
      >
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPortal>
  );
});
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectItem = React.forwardRef<
  ElementRef<typeof SelectPrimitive.Item>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <SelectPrimitive.Item
      className={cn(
        "text-xs leading-none  text-white  flex items-center h-[25px] px-3 cursor-pointer  select-none data-[disabled]:text-mainGray data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-blue-500 ",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});

SelectItem.displayName = SelectPrimitive.Item.displayName;
// export default SelectDemo;

export {
  SelectLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectGroup,
};
