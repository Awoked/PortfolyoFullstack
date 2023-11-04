"use client"
import React, { useEffect, useState } from 'react'
import { Gallery, SectionData } from '@prisma/client'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import { useToast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { galleryService, sectionService } from '@/services'
import Tiptap from '@/components/Tiptap/Tiptap'


import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from '@/app/api/uploadthing/core'
import Image from 'next/image'
import { SectionType } from '@/app/api/sections/types'
import { GalleryType } from '@/app/api/gallery/types'


type PropTypes = {
    initialData: SectionType
    method?: 'create' | 'update'
}

const SectionsForm = ({ initialData, method }: PropTypes) => {
    const { toast } = useToast();
    const [initialValues, setInitialValues] = useState(initialData);
    const [galleryData, setGalleryData] = useState<GalleryType[]>([]);
    const [galleryLoading, setGalleryLoading] = useState<{ id: number, isLoading: boolean }>({ id: 0, isLoading: false });

    const handleFormSubmit = async (
        values: SectionType,
        actions: FormikHelpers<SectionType>
    ) => {
        actions.setSubmitting(true);
        let data;
        if (method === "create") {
            data = await sectionService.createSection(values)
        }
        if (method === "update") {
            data = await sectionService.updateSection(values)
            const gallery = await galleryService.updateGallery(galleryData);
        }



        await RevalidateValues();


        if (data) {
            toast({
                title: "Success",
                description: `${values.section} section ${method === "create" ? "Created" : "Saved"}!`,
            })
        } else {
            toast({
                title: "Error",
                variant: "destructive"
            })
        }

        actions.setSubmitting(false);
    }

    const handleValidate = (values: SectionType) => {
        const errors: Partial<Record<keyof SectionType, string>> = {}

        function setSectionError(key: keyof SectionType, error: string) {
            errors[key] = error;
        }

        if (!values.section) {
            setSectionError("section", "Bu alan zorunludur")
        }
        return errors
    }

    const handleDeleteGalleryItem = async (id: number) => {
        try {
            await galleryService.deleteById(id);

            await RevalidateValues();


            toast({
                title: "Deleted",
            })
        } catch (error) {
            await RevalidateValues();
            toast({
                title: "Error",
                description: `cant deleted`,
                variant: "destructive"
            })
        }
    }

    async function RevalidateValues() {
        const SectionData = await sectionService.getBySection(initialData.section);
        const GalleryData = await galleryService.getSectionGallery(initialData.id);
        if (SectionData && GalleryData) {
            setInitialValues(SectionData);
            setGalleryData(GalleryData);
        }
    }


    useEffect(() => {

        galleryService.getSectionGallery(initialData.id)
            .then((data) => {
                if (data) {
                    setGalleryData(data)
                }
            })

    }, [initialData.id])

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={handleFormSubmit}
                validate={handleValidate}
                enableReinitialize={true}
            >
                {({ isSubmitting, initialValues, setFieldValue }) => (
                    <>
                        <Form>
                            <div className='space-y-4 mb-6'>
                                {
                                    Object.keys(initialValues).map((key, index) => {

                                        return (
                                            key !== "Gallery" && key !== "id" && key !== "content" &&
                                            <div
                                                className='flex flex-col gap-1'
                                                key={index}
                                            >
                                                <label
                                                    htmlFor={`${key}`}
                                                    className='text-xs font-bold'
                                                >
                                                    {key}
                                                </label>
                                                <Field
                                                    name={`${key}`}
                                                    as={Input}
                                                    placeholder={key}
                                                    id={key}
                                                />
                                                <span className='text-destructive'>
                                                    <ErrorMessage className='bg-red-200' name={`SectionData.${key}`} />
                                                </span>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <Tiptap
                                onChange={(richText) => { setFieldValue("content", richText) }}
                                description={initialValues.content ? initialValues.content : '<p>İçerik güncelleniyor...</p>'}
                            />

                            <p className='text-2xl font-medium mb-2'>
                                Galeri
                            </p>

                            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-2'>
                                {
                                    galleryData &&
                                    galleryData.map((data, index) => (
                                        <div key={index} className='space-y-2 border-2 border-primary-foreground p-2 rounded-md'>


                                            <div className='flex flex-col h-full justify-between'>
                                                <div>
                                                    <div className='flex justify-end'>
                                                        <Button
                                                            type='button'
                                                            variant={"destructive"}
                                                            onClick={() => handleDeleteGalleryItem(data.id)}
                                                        >
                                                            X
                                                        </Button>
                                                    </div>

                                                    <div className={`${galleryLoading.id === data.id && galleryLoading.isLoading ?
                                                        "relative before:absolute before:inset-0 before:bg-black before:backdrop-blur-md before:bg-opacity-50 before:animate-pulse"
                                                        :
                                                        "blur-none"}`
                                                    }
                                                    >
                                                        <Image
                                                            src={data.imageLinkHref}
                                                            width={250}
                                                            height={500}
                                                            onLoad={() => setGalleryLoading({ id: data.id, isLoading: false })}
                                                            className={`w-full mx-auto object-contain block`}
                                                            alt={data.imageTitle ? data.imageTitle : ''}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='space-y-2'>
                                                    {
                                                        Object.keys(data).map((key, idx) => (
                                                            key !== "id" && key !== "sectionId" &&
                                                            <React.Fragment key={idx}>
                                                                <Input
                                                                    name={`${key}`}
                                                                    placeholder={key}
                                                                    disabled={false}
                                                                    defaultValue={data[key]}
                                                                    onChange={(e) => setGalleryData((oldVal) => {
                                                                        if (oldVal) {
                                                                            const newValue = oldVal[index];
                                                                            newValue[key] = e.target.value;
                                                                            oldVal[index] = newValue
                                                                            return oldVal
                                                                        } else {
                                                                            return oldVal
                                                                        }
                                                                    })}
                                                                />
                                                            </React.Fragment>
                                                        ))
                                                    }
                                                    <UploadButton<OurFileRouter>
                                                        appearance={{
                                                            button: {
                                                                width: "100%"
                                                            }
                                                        }}
                                                        onUploadBegin={() => setGalleryLoading({ id: data.id, isLoading: true })}
                                                        endpoint="singleUploader"
                                                        onClientUploadComplete={async (res) => {
                                                            await galleryService.deleteById(data.id);
                                                            const sResponse = await galleryService.createGallery({
                                                                files: res,
                                                                sectionId: initialData.id,
                                                                filterKey: 'primaryKey'
                                                            })

                                                            await RevalidateValues();
                                                        }}
                                                        onUploadError={(err) => { console.log(err) }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                    ))

                                }
                            </div>


                            <UploadButton<OurFileRouter>
                                endpoint="imageUploader"
                                onClientUploadComplete={async (res) => {
                                    const sResponse = await galleryService.createGallery({
                                        files: res,
                                        sectionId: initialData.id,
                                        filterKey: 'primaryKey'
                                    })

                                    await RevalidateValues();
                                }}
                                onUploadError={(err) => { console.log(err) }}
                            />

                            <Button type='submit' disabled={isSubmitting} className='sticky bottom-0 w-full my-4 py-4'>
                                {isSubmitting ? "Saving..." : "Save"}
                            </Button>
                        </Form>

                    </>
                )
                }
            </Formik >



        </>
    )
}

export default SectionsForm