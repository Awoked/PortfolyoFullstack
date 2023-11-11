import { Drawing } from '@/services/api/drawings/types'
import Image from 'next/image'
import React from 'react'

const DrawingsGrid = ({ drawingsData, showCount }: { drawingsData: Drawing[], showCount?: number }) => {


    return (
        <div className='columns-1 sm:columns-2 md:columns-3 2xl:columns-4 mb-8'>
            {
                drawingsData.length &&
                drawingsData.map((data, index) => {
                    const filter = showCount ? index < showCount : true

                    return (
                        filter &&
                        <Image
                            src={data.attributes.cover?.data?.attributes.url || ""}
                            width={data.attributes.cover?.data?.attributes.width || 1024}
                            height={data.attributes.cover?.data?.attributes.width || 768}
                            alt={data.attributes.cover?.data?.attributes.alternativeText || 'Alper Koşay / Çizimlerim'}
                            className='w-full h-auto mb-2 shadow-md shadow-black'
                            key={index}
                        />
                    )
                })
            }

        </div>
    )
}

export default DrawingsGrid