import Link from 'next/link';
import React from 'react'
import { AiFillGithub } from "react-icons/ai";
import { CiCoffeeCup } from "react-icons/ci";
import { FaLinkedinIn } from "react-icons/fa";
const Footer = () => {
    return (
        <footer className={`py-8 border-t`}>

            <div className="container mx-auto">
                <div className="inner flex gap-y-6 flex-wrap items-center justify-between">
                    <p className='lg:text-lg font-medium'>
                        Alper Koşay 2023 &copy; Tüm Hakları Saklıdır.
                    </p>

                    <div className="social flex gap-4">
                        <Link
                            href={"https://www.linkedin.com/in/alper-ko%C5%9Fay/"}
                            target='_blank'
                            className='w-max flex items-end gap-2 hover:opacity-90'
                        >
                            <FaLinkedinIn size={28} />
                            Linkedin
                        </Link>
                        <Link
                            href={"https://github.com/Awoked"}
                            target='_blank'
                            className='w-max flex items-end gap-2 hover:opacity-90'
                        >
                            <AiFillGithub size={28} />
                            Github
                        </Link>
                        <Link
                            href={"https://www.buymeacoffee.com/alperkosay"}
                            target='_blank'
                            className='w-max flex items-end gap-2 hover:opacity-90'
                        >
                            <CiCoffeeCup size={28} />
                            Bağış yap
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer