import React from 'react'
import Logo from '../Logo'
import Navbar from './Navbar'
import Link from 'next/link'
import { Navigation } from '@/services/api/navigations/types'

const Header = ({ navData }: { navData: Navigation[] }) => {
    return (
        <header className='absolute left-0 top-0 w-full py-4 z-20'>
            <div className="container flex justify-between items-center">
                <Link href={"/"} title='Alper Koşay'>
                    <Logo />
                </Link>
                <Navbar navData={navData} />
            </div>
        </header>
    )
}

export default Header