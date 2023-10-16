"use client"
import { signOut } from 'next-auth/react'
import React from 'react'
import { AiFillHome } from 'react-icons/ai'

const SideBar = () => {
    return (
        <div className='w-40 bg-red-600'>
            <ul>
                <li onClick={() => { signOut() }}>
                    <AiFillHome />
                </li>
            </ul>
        </div>
    )
}

export default SideBar