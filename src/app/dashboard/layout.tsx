import React from 'react'
import SideBar from './_components/Layout/SideBar'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-screen'>
      <SideBar />
      <main className='flex-1 h-full overflow-y-auto'>
        {children}
      </main>
    </div>
  )
}

export default layout