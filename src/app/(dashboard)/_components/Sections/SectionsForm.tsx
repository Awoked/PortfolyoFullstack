"use client"
import React, { useEffect, useState } from 'react'
import { Gallery, SectionData } from '@prisma/client'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import { useToast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { galleryService, sectionService } from '@/services'
import { ISectionData } from '../../dashboard/sections/[section]/page'
import Tiptap from '@/components/Tiptap/Tiptap'


import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from '@/app/api/uploadthing/core'


type PropTypes = {
    initialData: ISectionData
    method?: 'create' | 'update'
}

const SectionsForm = ({ initialData, method }: PropTypes) => {
    const { toast } = useToast();
    const [initialValues, setInitialValues] = useState(initialData);

    const handleFormSubmit = async (
        values: ISectionData,
        actions: FormikHelpers<ISectionData>
    ) => {
        actions.setSubmitting(true);

        if (method === "create") {
            const data = await sectionService.createSection({
                SectionData: values.SectionData,
                GalleryData: values.GalleryData
            })
        }
        if (method === "update") {
            const data = await sectionService.updateSection({
                SectionData: values.SectionData,
                GalleryData: values.GalleryData
            })
        }

        toast({
            title: "Success",
            description: `${values.SectionData.section} section ${method === "create" ? "Created" : "Saved"}!`,
        })
        actions.setSubmitting(false);
    }

    const handleValidate = (values: ISectionData) => {
        const errors: { SectionData?: Partial<Record<keyof SectionData, string>> } = {}

        function setSectionError(key: keyof SectionData, error: string) {
            errors.SectionData = {
                ...errors.SectionData,
                [key]: error,
            }
        }

        if (!values.SectionData.section) {
            setSectionError("section", "Bu alan zorunludur")
        }
        return errors
    }

    const handleDeleteGalleryItem = async (id: number) => {
        try {
            await galleryService.deleteById(id);

            toast({
                title: "Deleted",
            })
        } catch (error) {

            toast({
                title: "Error",
                description: `cant deleted`,
                variant: "destructive"
            })
        }
    }

    return (
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
                                Object.keys(initialValues.SectionData).map((key, index) => {

                                    return (
                                        key !== "Gallery" && key !== "id" &&
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
                                                name={`SectionData.${key}`}
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
                            onChange={(richText) => { setFieldValue("SectionData.content", richText) }}
                            description={initialValues.SectionData.content ? initialValues.SectionData.content : '<p>İçerik güncelleniyor...</p>'}
                        />

                        <p className='text-2xl font-medium mb-2'>
                            Galeri
                        </p>

                        <div className='space-y-2 mb-2'>
                            {
                                initialValues.GalleryData?.map((data, index) => (
                                    <div key={index} className='space-y-2 border-2 border-primary-foreground p-2 rounded-md'>

                                        <div className='flex justify-end'>
                                            <Button
                                                type='button'
                                                variant={"destructive"}
                                                onClick={() => handleDeleteGalleryItem(data.id)}
                                            >
                                                X
                                            </Button>
                                        </div>
                                        {

                                            Object.keys(data).map((key, idx) => (
                                                key !== "id" && key !== "sectionId" &&
                                                <React.Fragment key={idx}>
                                                    <Field
                                                        name={`GalleryData[${index}].${key}`}
                                                        as={Input}
                                                        placeholder={key}
                                                        disabled={false}
                                                    />
                                                </React.Fragment>
                                            ))
                                        }
                                    </div>

                                ))

                            }
                        </div>


                        <UploadButton<OurFileRouter>
                            endpoint="imageUploader"
                            onClientUploadComplete={async (res) => {
                                const sResponse = await galleryService.createGallery({ files: res, sectionId: initialData.SectionData.id })

                                console.log('sResponse', sResponse)
                            }}
                            onUploadError={(err) => { console.log(err) }}
                        />

                        <Button type='submit' disabled={isSubmitting}>
                            {isSubmitting ? "Kaydediliyor..." : "Kaydet"}
                        </Button>
                    </Form>

                </>
            )
            }
        </Formik >
    )
}

export default SectionsForm