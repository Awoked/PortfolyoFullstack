import DrawingsGrid from '@/components/Sections/Drawings/DrawingsGrid';
import Pagination from '@/components/ui/pagination';
import api from '@/services/api';
import { redirect } from 'next/navigation';
import React from 'react'

const Drawings = async ({
    page
}: {
    page?: number
}) => {

    const { data: drawings, meta } = await api.drawings.findByPagination(page || 1);

    if (page !== 1 && !drawings?.length) {
        redirect("/cizimlerim")
    }


    return (
        <React.Fragment>
            <DrawingsGrid drawingsData={drawings} />
            <Pagination meta={meta} />
        </React.Fragment>
    )
}

export default Drawings