"use client"
import React from 'react'
import { SectionData } from '@prisma/client'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import { useToast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Sections } from '@/services/api'


type PropTypes = {
    initialData: SectionData
    method?: 'create' | 'update'
}

const SectionsForm = ({ initialData, method }: PropTypes) => {
    const { toast } = useToast();

    const initialValues = initialData

    const handleFormSubmit = async (
        values: SectionData,
        actions: FormikHelpers<SectionData>
    ) => {
        actions.setSubmitting(true);

        if (method === "create") {
            const data = await Sections.POST({ client: true }, values)
        }
        if (method === "update") {
            const data = await Sections.PUT({ client: true }, values)
        }
        toast({
            title: "Success",
            description: `${values.section} section ${method === "create" ? "Created" : "Saved"}!`,
        })
        actions.setSubmitting(false);
    }

    const handleValidate = (values: SectionData) => {
        const errors: Partial<Record<keyof SectionData, string>> = {}

        if (!values.section) {
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
                            Object.keys(initialValues).map((key, index) => (
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