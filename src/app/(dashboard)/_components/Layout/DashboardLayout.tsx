"use client"
import React from 'react'
import SideBar from './SideBar'

import { Poppins } from 'next/font/google'

const poppins = Poppins({
    subsets: ['latin'],
    weight: [
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900",
    ]
})

type ComponentType = {
    children: React.ReactNode
}
const DashboardLayout = ({ children }: ComponentType) => {
    return (
        <>
            <div className={`${poppins.className} flex h-screen overflow-hidden`}>
                <SideBar />
                <main className='h-full bg-dashboard-background flex-1 overflow-y-auto'>
                    {children}
                </main>
            </div>
        </>
    )
}

export default DashboardLayout