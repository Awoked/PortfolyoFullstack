import React from 'react'
import { AiFillGithub } from "react-icons/ai";

const Footer = () => {
    return (
        <footer className={`py-8 border-t footer-background text-black`}>

        <div className="container mx-auto">
            <div className="inner flex gap-y-6 flex-wrap items-center justify-between">
                <p className='lg:text-lg font-medium'>
                    Alper Koşay 2023 &copy; Tüm Hakları Saklıdır.
                </p>

                <div className="social flex gap-3">
                    <a
                        href={"https://github.com/Awoked"}
                        target='_blank'
                        className='w-max flex hover:opacity-90'
                    >
                        <AiFillGithub size={28} />
                    </a>
                </div>
            </div>
        </div>


    </footer>
    )
}

export default Footer