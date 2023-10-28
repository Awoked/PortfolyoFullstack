import React from 'react'
import DashboardLayout from './_components/Layout/DashboardLayout'
import { Metadata } from 'next'

export const metadata:Metadata = {
  title: 'Alper Koşay - Panel',

}

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  )
}

export default layout