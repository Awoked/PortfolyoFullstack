import React from 'react'
import { twMerge } from 'tailwind-merge'

type PropsType = {
    children: React.ReactNode
    className?: string
}
const SectionTitle = ({ children, className }: PropsType) => {
    return (
        <div className={twMerge('text-3xl font-bold', className)}>
            {children}
        </div>
    )
}

export default SectionTitle