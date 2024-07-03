import { cn } from '@/utils/cn'
import { Slot } from '@radix-ui/react-slot';
import { VariantProps, cva } from 'class-variance-authority'
import React from 'react'
const buttonVariants = cva(
    ' bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 ease-in-out',
    {
        variants: {
            variant: {
                text: 'text-white bg-blue-500 hover:bg-blue-600 focus:ring-blue-500',
            },
            size: {
                default: 'h-9 px-4 py-2',
                sm: 'h-8 rounded-md px-3 text-xs',
                lg: 'h-10 rounded-md px-8',
                icon: 'size-9',
            },
        },
        defaultVariants: {
            variant: 'text',
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
