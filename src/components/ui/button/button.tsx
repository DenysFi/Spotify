import { cn } from '@/utils/cn'
import { Slot } from '@radix-ui/react-slot';
import { VariantProps, cva } from 'class-variance-authority'
import React from 'react'

const buttonVariants = cva(
    'disabled:pointer-events-none disabled:opacity-50 inline-flex items-center justifu-center transition-colors font-bold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap ',
    {
        variants: {
            variant: {
                default: 'text-primary-foreground bg-primary ',
                pillFilled: 'text-secondary-foreground bg-secondary  ',
                text: 'text-textButton bg-transparent hover:text-textButton-hover'
            },
            size: {
                sm: 'h-8 rounded-full px-4 py-1 text-sm ',
                lg: 'h-10 rounded-md px-2 py-1 text-base',
                icon: 'size-9',
            },
            hover: {
                pulse: 'hover:scale-105',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'sm'
        },
    },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
        isLoading?: boolean;
        iconLeft?: React.ReactNode;
        iconRight?: React.ReactNode;
    };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({
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
    }, ref) => {

        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, hover, className }))}
                ref={ref}
                {...props}
            >
                {iconLeft && !isLoading && <span className='mr-2'>{iconLeft}</span>}
                {isLoading && <div className="mr-2" >Loading...</div>}
                {children}
                {iconRight && !isLoading && <span className='ml-2'>{iconRight}</span>}
            </Comp>
        )
    });

export default Button
