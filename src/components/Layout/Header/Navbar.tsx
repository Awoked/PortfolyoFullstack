import React from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import Link from 'next/link'


import { Navigation } from '@/services/api/navigations/types';

const Navbar = ({ navData }: { navData: Navigation[] }) => {


    return (
        <React.Fragment>

            <NavigationMenu className='max-lg:hidden'>
                <NavigationMenuList>
                    {
                        !!navData.length &&
                        navData.map((data, index) => (
                            <NavigationMenuItem key={index}>
                                <Link href={data.attributes.href || '/'} passHref legacyBehavior>
                                    <NavigationMenuLink className='p-4 inline-block' title={data.attributes.title}>{data.attributes.title}</NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        ))
                    }


                </NavigationMenuList>
            </NavigationMenu>

        </React.Fragment>
    )
}

export default Navbar