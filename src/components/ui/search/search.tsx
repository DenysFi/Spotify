import { cn } from '@/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

const searchVariants = cva(
    'rounded-full  flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-ring',
    {
        variants: {
            variant: {
                default: '',
            },
            size: {
                sm: '',
                lg: 'h-12 p-3 px-9',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'lg'
        },
    },
)

type SearchProps = InputHTMLAttributes<HTMLInputElement> & VariantProps<typeof searchVariants> & {
    icon?: ReactNode;
    isLoading?: boolean;
};

const SearchInput = forwardRef<HTMLInputElement, SearchProps>(({ className, variant, size, ...props }, ref) => {
    return (
        <div className={searchVariants({ variant })}>
            <input ref={ref} {...props} className={cn(searchVariants({ size }), className)} />
        </div>
    )
})

export default SearchInput
