import React from 'react'
import { SectionData } from '@prisma/client'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import { toast, useToast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type initialValuesType = Omit<SectionData, "id">

const SectionsForm = () => {
    const { toast } = useToast();

    const initialValues: initialValuesType = {
        section: '',
        content: '',
        description: '',
        firstLinkHref: '',
        firstLinkText: '',
        secondLinkHref: '',
        secondLinkText: '',
        subTitle: '',
        title: '',
    }

    const handleFormSubmit = (
        values: initialValuesType,
        actions: FormikHelpers<initialValuesType>
    ) => {
        actions.setSubmitting(true);
        setTimeout(() => {
            toast({
                title: "Success",
                description: `${values.section} Saved!`,
                className: "bg-green-600 text-white"
            })
            actions.setSubmitting(false);

        }, 500);
    }

    const handleValidate = (values: initialValuesType) => {
        let keys = Object.keys(initialValues);

        const errors: Partial<Record<keyof initialValuesType, string>> = {}


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
                                    <Field name={key} as={Input} placeholder={key} />
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