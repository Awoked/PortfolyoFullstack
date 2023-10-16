import React from 'react'
import SideBar from './SideBar'

type ComponentType = {
    children: React.ReactNode
}
const DashboardLayout = ({ children }: ComponentType) => {
    return (
        <>
            <div className='flex h-screen'>
                <SideBar />
                <main className='h-full bg-red-300 flex-1 overflow-y-auto'>
                    {children}
                </main>
            </div>
        </>
    )
}

export default DashboardLayout