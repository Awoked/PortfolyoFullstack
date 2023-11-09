import { Project } from '@/services/api/projects/types';
import Image from 'next/image'
import React from 'react'

import { AiFillGithub } from "react-icons/ai";
import { TbWorldWww } from "react-icons/tb";
import ProjectLink from './project-link';
const ProjectCard = ({ cardData }: { cardData: Project }) => {
    return (
        <div className='project-card group'>

            <div className="project-cover max-h-[300px] overflow-hidden">
                <Image
                    src={cardData.attributes.cover?.data.attributes.url || ''}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform druation-500'
                    width={300}
                    height={500}
                    alt={cardData.attributes.title || "Alper Koşay"}
                />
            </div>
            <div className="card-body py-4 px-3 flex flex-col gap-3">
                <h3 className='font-medium text-xl'>
                    {cardData.attributes.title}
                </h3>
                <p className='text-sm font-light'>
                    {cardData.attributes.details}
                </p>
            </div>
            <div className="px-3 space-y-1">
                {
                    cardData.attributes.githubLink &&
                    <ProjectLink href={cardData.attributes.githubLink}>
                        Githubda İncele
                        <AiFillGithub size={26} />
                    </ProjectLink>
                }
                {
                    cardData.attributes.liveLink &&
                    <ProjectLink href={cardData.attributes.liveLink} className='text-blue-700'>
                        Canlı İncele
                        <TbWorldWww size={26} />
                    </ProjectLink>
                }
            </div>
        </div>
    )
}

export default ProjectCard