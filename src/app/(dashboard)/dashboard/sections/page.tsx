
import React from 'react'
import { DataTable } from '../../_components/Sections'
import { Sections } from '@/services/api'


const page = async () => {
  const sectionData = await Sections.GET();



  return (
    <section className='mb-10'>
      <div className="container">
        <DataTable data={sectionData} />
      </div>
    </section>
  )
}

export default page