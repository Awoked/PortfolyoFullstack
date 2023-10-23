"use client"
import React from 'react'
import { SectionData } from '@prisma/client'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import { useToast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SectionService } from '@/services/api'
import { ISectionData } from '../../dashboard/sections/[section]/page'


type PropTypes = {
    initialData: ISectionData
    method?: 'create' | 'update'
}

const SectionsForm = ({ initialData, method }: PropTypes) => {
    const sectionService = new SectionService({ isServer: false });
    const { toast } = useToast();

    const initialValues = initialData

    const handleFormSubmit = async (
        values: ISectionData,
        actions: FormikHelpers<SectionData>
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
        const errors: Partial<Record<keyof SectionData, string>> = {}

        if (!values.SectionData.section) {
            errors.section = "Bu alan zorunludur"
        }
        return errors
    }


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            validate={handleValidate}
        >
            {({ isSubmitting, initialValues }) => (
                <>
                    <Form>
                        {
                            Object.keys(initialValues.SectionData).map((key, index) => {

                                return (
                                    <div
                                        className='flex flex-col gap-1 mb-4'
                                        key={index}
                                    >
                                        <Field
                                            name={key}
                                            as={Input}
                                            placeholder={key}
                                            disabled={key === "id"}
                                        />
                                        <span className='text-destructive'>
                                            <ErrorMessage className='bg-red-200' name={key} />
                                        </span>
                                    </div>
                                )
                            })
                        }

                        {
                            initialValues.GalleryData?.map((data, index) => (
                                Object.keys(data).map((data, index) => (

                                    <Field
                                        name={data}
                                        as={Input}
                                        placeholder={data}
                                        disabled={false}
                                    />
                                ))
                            ))

                        }

                        <Button type='submit' disabled={isSubmitting}>
                            {isSubmitting ? "Kaydediliyor..." : "Kaydet"}
                        </Button>
                    </Form>

                </>
            )}
        </Formik>
    )
}

export default SectionsForm