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


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import { BiMenu } from 'react-icons/bi';
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


            <DropdownMenu>
                <DropdownMenuTrigger className='lg:hidden text-5xl'>
                    <BiMenu />
                </DropdownMenuTrigger>
                <DropdownMenuContent className='mr-5'>
                    {
                        !!navData.length &&
                        navData.map((data, index) => (
                            <DropdownMenuItem asChild>
                                <Link href={data.attributes.href || '/'} title={data.attributes.title}>{data.attributes.title}</Link>
                            </DropdownMenuItem>
                        ))
                    }
                </DropdownMenuContent>
            </DropdownMenu>


        </React.Fragment>
    )
}

export default Navbar