import Image from 'next/image'
import React from 'react'

import { AiFillGithub } from "react-icons/ai";
import { TbWorldWww } from "react-icons/tb";
const ProjectCard = ({ imageUrl, title, details, githubLink, liveLink }) => {
    return (
        <div className='project-card group'>

            <div className="project-cover max-h-[300px] overflow-hidden">
                <Image
                    src={imageUrl}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform druation-500'
                    width={300}
                    height={500}
                    alt={title}
                />
            </div>
            <div className="card-body py-4 px-3 flex flex-col gap-3">
                <h3 className='font-medium text-xl'>
                    {title}
                </h3>
                <p className='text-sm font-light'>
                    {details}
                </p>
            </div>
            <div className="card-footer px-3 flex flex-col gap-y-1">
                {
                    githubLink &&
                    <a href={githubLink} target='_blank' className='project-link'>
                        Githubda İncele
                        <AiFillGithub size={26} />
                    </a>
                }
                {
                    liveLink &&
                    <a href={liveLink} target='_blank' className='project-link !text-blue-700'>
                        Canlı İncele
                        <TbWorldWww size={26} />
                    </a>
                }
            </div>
        </div>
    )
}

export default ProjectCard