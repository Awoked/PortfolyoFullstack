import React from 'react'
import { SectionData } from '@prisma/client'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { toast, useToast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'

const SectionsForm = () => {

    const { toast } = useToast();
    const initialValues: Omit<SectionData, "id"> = {
        content: '',
        description: '',
        firstLinkHref: '',
        firstLinkText: '',
        secondLinkHref: '',
        secondLinkText: '',
        section: '',
        subTitle: '',
        title: '',
    }

    const handleFormSubmit = () => {

    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
                setTimeout(() => {
                    toast({
                        title: "success",
                        description: values.content
                    })
                }, 500);
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field name="content" as={Input} placeholder="sa" />
                </Form>
            )}
        </Formik>
    )
}

export default SectionsForm