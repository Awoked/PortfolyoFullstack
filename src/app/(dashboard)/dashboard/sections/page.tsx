
import React from 'react'
import { DataTable } from '../../_components/Sections'
import { sectionService } from '@/services'
import SectionTitle from '../../_components/ui/SectionTitle';


const page = async () => {
  // const sectionService = new SectionService();
  const sectionData = await sectionService.getAll();



  return (
    <section className='mb-10'>
      <div className="container">
        {
          sectionData ?
            <DataTable data={sectionData} />
            :
            <SectionTitle>
              <h1>
                Server Error
              </h1>
            </SectionTitle>
        }
      </div>
    </section>
  )
}

export default page