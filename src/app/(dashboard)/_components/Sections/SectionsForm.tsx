"use client"
import React, { useState } from 'react'
import { Gallery, SectionData } from '@prisma/client'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import { useToast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SectionService } from '@/services'
import { ISectionData } from '../../dashboard/sections/[section]/page'


type PropTypes = {
    initialData: ISectionData
    method?: 'create' | 'update'
}

const SectionsForm = ({ initialData, method }: PropTypes) => {
    const sectionService = new SectionService({ isServer: false });
    const { toast } = useToast();

    // const initialValues = initialData

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

    const handleDeleteGalleryItem = (id: number) => {


    }


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            validate={handleValidate}
            enableReinitialize
        >
            {({ isSubmitting, initialValues, setFieldValue }) => (
                <>
                    <Form>
                        <div className='space-y-2 mb-6'>
                            {
                                Object.keys(initialValues.SectionData).map((key, index) => {

                                    return (
                                        key !== "Gallery" &&
                                        <div
                                            className='flex flex-col gap-1'
                                            key={index}
                                        >
                                            <Field
                                                name={`SectionData.${key}`}
                                                as={Input}
                                                placeholder={key}
                                                disabled={key === "id"}
                                            />
                                            <span className='text-destructive'>
                                                <ErrorMessage className='bg-red-200' name={`SectionData.${key}`} />
                                            </span>
                                        </div>
                                    )
                                })
                            }
                        </div>


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

                        <Button
                            type='button'
                            className='w-full mb-10'
                            onClick={() => {

                                setInitialValues((snapshot) => {
                                    const SectionData = { ...snapshot.SectionData };
                                    const newGalleryData = [
                                        ...snapshot.GalleryData as Gallery[],
                                        { id: 0, imageLinkHref: '', imageTitle: '', sectionId: 0 }
                                    ]

                                    return {
                                        ...snapshot,
                                        GalleryData: newGalleryData
                                    }
                                })
                            }}
                        >
                            Resim Ekle
                        </Button>

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