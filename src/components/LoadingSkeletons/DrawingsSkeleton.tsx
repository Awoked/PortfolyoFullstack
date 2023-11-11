import React from 'react'

const DrawingsSkeleton = () => {
    return (
        <div className='columns-1 md:columns-2 lg:columns-3 2xl:columns-4 gap-4'>
            {[...Array(20)].map((_, index) => (
                <div key={index} className={`${index % 2 === 0 ? "h-[500px]" : "h-[800px]"} bg-gray-950 w-full animate-pulse mb-4`}></div>
            ))}
        </div>
    )
}

export default DrawingsSkeleton