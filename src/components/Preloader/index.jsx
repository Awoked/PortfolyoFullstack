import gsap from 'gsap'
import React, { useEffect, useRef } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Preloader = () => {

    const preloaderEl = useRef(null);
    
    useEffect(() =>{

        gsap.to(preloaderEl.current,{
            autoAlpha: 0,
            delay: 0.5  
        })
    },[])

    return (
        <div className='fixed inset-0 grid place-items-center bg-white z-10' ref={preloaderEl}>
            <div>
                <AiOutlineLoading3Quarters
                    size={50}
                    className='animate-spin'
                />
                <p className='text-sm font-medium animate-pulse mt-2'>
                    Loading...
                </p>
            </div>
        </div>
    )
}

export default Preloader
