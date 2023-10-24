
import React from 'react'
import { DataTable } from '../../_components/Sections'
import { SectionService } from '@/services'


const page = async () => {
  const sectionService = new SectionService();
  const sectionData = await sectionService.getAll();



  return (
    <section className='mb-10'>
      <div className="container">
        <DataTable data={sectionData} />
      </div>
    </section>
  )
}

export default page