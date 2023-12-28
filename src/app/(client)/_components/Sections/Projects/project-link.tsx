import { cn } from '@/lib/utils'
import React, { HTMLAttributeAnchorTarget } from 'react'

type ComponentProps = {
    children: React.ReactNode
    href: string
    className?: string
    target?: HTMLAttributeAnchorTarget
}
const ProjectLink = ({
    children,
    href,
    target = "_blank",
    className
}: ComponentProps) => {
    return (
        <a
            href={href}
            target={target}
            className={cn('flex gap-2 items-center  hover:opacity-70 transition-opacity', className)}
        >
            {children}
        </a>
    )
}

export default ProjectLink