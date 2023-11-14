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
        <React.Fragment>
            <Image
                src={"/images/logo/logo-dark.png"}
                width={205}
                height={60}
                alt='Koşay'
                priority
                className={cn('h-auto dark:hidden', className)}
            />
            <Image
                src={"/images/logo/logo-white.png"}
                width={205}
                height={60}
                alt='Koşay'
                priority
                className={cn('h-auto hidden dark:block', className)}
            />
        </React.Fragment>
    )
}

export default Logo