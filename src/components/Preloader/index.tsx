"use client"
import gsap from 'gsap'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import { Progress } from "@/components/ui/progress"


const Preloader = () => {

    const preloaderEl = useRef<HTMLDivElement>(null);


    return (
        <div
            className='fixed inset-0 grid place-items-center bg-white z-50' ref={preloaderEl}
        >
            <div className='max-w-sm w-full flex flex-col items-center gap-6'>
                <AiOutlineLoading3Quarters
                    size={50}
                    className='animate-spin'
                />
            </div>
        </div>
    )
}

export default Preloader
