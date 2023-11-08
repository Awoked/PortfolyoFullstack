import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

type Props = {
    variant?: "dark" | "light"
    className?: string
}

const Logo = ({
    variant = "dark",
    className
}: Props) => {
    return (
        <Image
            src={variant === "dark" ? "/images/logo/logo-dark.png" : "/images/logo/logo-white.png"}
            width={205}
            height={60}
            alt='Koşay'
            className={cn('h-auto', className)}
        />
    )
}

export default Logo