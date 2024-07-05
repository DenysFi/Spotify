import { cn } from '@/utils/cn'
import { Slot } from '@radix-ui/react-slot';
import { VariantProps, cva } from 'class-variance-authority'
import React from 'react'

const buttonVariants = cva(
    'disabled:pointer-events-none disabled:opacity-50 inline-flex items-center justifu-center transition-colors   focus:outline-none focus:ring-1 focus:ring-white-300 whitespace-nowrap rounded-md text-sm',
    {
        variants: {
            variant: {
                default: 'text-primary-foreground bg-primary hover:bg-primary ',
                pillFilled: 'text-white bg-blue-500 hover:bg-blue-600 ',
            },
            size: {
                default: 'h-8 px-4 py-1',
                sm: 'h-8 rounded-md px-3 text-xs',
                lg: 'h-10 rounded-md px-8',
                icon: 'size-9',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
        isLoading?: boolean;
        icon?: React.ReactNode;
    };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({
        className,
        variant,
        size,
        asChild = false,
        children,
        isLoading,
        icon,
        ...props
    }, ref) => {

        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            >
                {icon && !isLoading && <span className='mr-2'>{icon}</span>}
                {isLoading && <div className="mr-2" >Loading...</div>}
                {children}
            </Comp>
        )
    });

export default Button
