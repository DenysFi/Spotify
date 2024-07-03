import { cn } from '@/utils/cn'
import { VariantProps, cva } from 'class-variance-authority'
import React from 'react'

const buttonVariants = cva(
    '',
    {
        variants: {
            variant: {
                text: ''
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
        const Comp = asChild ? <Slot></Slot> : 'button';
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            >
                {icon && !isLoading && <span className='mr-2'>{icon}</span>}
                {isLoading && <div className="mr-2" >Loading...</div>}
                {children}
            </button>
        )
    });

export default Button
