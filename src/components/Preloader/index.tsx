"use client"
import gsap from 'gsap'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import { Progress } from "@/components/ui/progress"


const Preloader = () => {

    const [progressVal, setProgressVal] = useState<number>(20);
    const preloaderEl = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        setProgressVal(60);

        setTimeout(() => {
            setProgressVal(100);
        }, 500);
        let ctx = gsap.context(() => {
            gsap.to(preloaderEl.current, {
                autoAlpha: 0,
                delay: 1
            })
        })

        return () => ctx.revert();
    }, [])

    return (
        <div
            className='fixed inset-0 grid place-items-center bg-white z-50' ref={preloaderEl}
        >
            <div className='max-w-sm w-full flex flex-col items-center gap-6'>
                <AiOutlineLoading3Quarters
                    size={50}
                    className='animate-spin'
                />
                <Progress value={progressVal} className='rounded-full h-2 w-full' />

            </div>
        </div>
    )
}

export default Preloader
