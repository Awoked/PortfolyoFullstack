"use client"
import React from 'react'
import Footer from './Footer';

import { Chivo_Mono } from 'next/font/google';
import Header from './Header/Header';
import { Navigation } from '@/services/api/navigations/types';
const chivo_mono = Chivo_Mono({
    subsets: ['latin'], weight: [
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
const Layout = ({ children, navData }: { 
    children: React.ReactNode 
    navData: Navigation[]
}) => {

    return (
        <React.Fragment>
            <div className={chivo_mono.className}>
                <Header navData={navData}/>
                {children}
                <Footer />
            </div>
        </React.Fragment>
    )

}

export default Layout