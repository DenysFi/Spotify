import { cn } from '@/utils/cn'
import { Slot } from '@radix-ui/react-slot';
import { VariantProps, cva } from 'class-variance-authority'
import React from 'react'

const buttonVariants = cva(
    'disabled:pointer-events-none disabled:opacity-50 inline-flex items-center justifu-center transition-colors  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap  text-sm',
    {
        variants: {
            variant: {
                default: 'text-primary-foreground bg-primary hover:scale-105  ',
                pillFilled: 'text-white bg-blue-500 hover:bg-blue-600 ',
            },
            size: {
                sm: 'h-8 rounded-full px-4 py-1 text-sm font-medium',
                lg: 'h-10 rounded-md px-8',
                icon: 'size-9',
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
