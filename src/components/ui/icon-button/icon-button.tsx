import { cn } from '@/utils/cn'
import { cva, type VariantProps } from 'class-variance-authority'
import React, { ButtonHTMLAttributes, forwardRef } from 'react'

const iconButtonVariants = cva(
    'rounded-full flex items-center',
    {
        variants: {
            variant: {
                default: 'bg-gray-200 hover:bg-gray-300'
            },
            size: {
                default: 'h-9 px-4 py-2',
                sm: 'h-8  px-3 ',
                lg: 'h-10  px-8',
            }
        }
    }
)

type iconButtonProps = VariantProps<typeof iconButtonVariants>
    & ButtonHTMLAttributes<HTMLButtonElement>

const IconButton = forwardRef<HTMLButtonElement, iconButtonProps>(
    ({ children, size, className, ...props }) => {

        return (
            <button
                className={cn(iconButtonVariants({ size }), className)}
                {...props}
            >
                {children}
            </button>
        )
    })


export default IconButton
