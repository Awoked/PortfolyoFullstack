import SectionTitle from '@/components/ui/section-title';
import api from '@/services/api'
import Image from 'next/image';
import React from 'react'

const page = async () => {

    const { data: drawings } = await api.drawings.findMany();
    const { data: _drawingsSectionData } = await api.sections.findBySection("drawings");
    const drawingsSectionData = _drawingsSectionData[0];


    return (
        <main className='pt-28 min-h-screen'>
            <section>
                <SectionTitle>
                    <h1>
                        {drawingsSectionData.attributes.title}
                    </h1>
                </SectionTitle>

                <div className='columns-1 sm:columns-2 md:columns-3 2xl:columns-4 mb-8'>
                    {
                        drawings.length &&
                        drawings.map((data, index) => (
                            <Image
                                src={data.attributes.cover?.data?.attributes.url || ""}
                                width={1024}
                                height={768}
                                alt={data.attributes.alt || 'Alper Koşay / Çizimlerim'}
                                className='w-full h-auto mb-2'
                                key={index}
                            />
                        ))
                    }

                </div>
            </section>
        </main>
    )
}

export default page