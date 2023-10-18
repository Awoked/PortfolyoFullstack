import React from 'react'

import styles from "./skills.module.css";

const SkillCard = ({ skillName, skillLevel, skillDetail }) => {

    return (
        <div className={`w-full skill-card shadow-lg  before:bg-blue-300 after:bg-blue-400 shadow-black ${styles.card}`}>
            <div className={`skill-card-inner bg-blue-300 p-3 h-full`}>
                <div className="card-header flex justify-between items-baseline pb-2">
                    <h3 className="skill-name font-semibold text-lg xl:text-xl">
                        {skillName}
                    </h3>

                    <span className='font-medium text-sm 2xl:text-base'>
                        {skillLevel}%
                    </span>
                </div>
                <div className="skill-level">
                    <div className="level w-full h-2 rounded-md border overflow-hidden">
                        <div className={`inner bg-red-500 rounded-md h-full`} style={{width: `${skillLevel}%`}}>
                        </div>
                    </div>
                </div>
                <p className="skill-detail text-base font-medium p-1 py-3">
                   {
                    skillDetail
                   }
                </p>
            </div>
        </div>
    )
}

export default SkillCard