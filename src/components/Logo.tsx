import Image from 'next/image'
import React from 'react'

type Props = {
    variant?: "dark" | "light"
}

const Logo = ({
    variant = "dark"
}: Props) => {
    return (
        <Image
            src={variant === "dark" ? "/images/logo/logo-dark.png" : "/images/logo/logo-white.png"}
            width={205}
            height={60}
            alt='Koşay'
            className='w-full h-auto'
        />
    )
}

export default Logo