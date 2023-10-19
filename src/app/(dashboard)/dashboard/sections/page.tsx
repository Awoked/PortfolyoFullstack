
import React from 'react'
import { DataTable } from '../../_components/Sections'
import { Sections } from '@/services/api'
import Breadcrumb from '@/components/ui/breadcrumb';


const page = async () => {
  const sectionData = await Sections.GET();



  return (
    <section>
      <div className="container">
        <DataTable data={sectionData} />
      </div>
    </section>
  )
}

export default page