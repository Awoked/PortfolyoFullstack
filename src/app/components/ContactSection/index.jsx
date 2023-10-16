"use client"
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from "@emailjs/browser";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {



    const FormValidate = values => {
        const errors = {}


        if (!values.email) {
            errors.email = 'Email girmeniz zorunludur.';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Hatalı mail adresi.';
        }

        if (!values.name) {
            errors.name = 'İsim girmeniz zorunludur';
        } else if (values.name.length < 2 || values.name.length > 35) {
            errors.name = 'Hatalı isim girişi.';
        }

        if (!values.message) {
            errors.message = 'Mesajınızı yazınız.';
        } else if (values.name.length < 3) {
            errors.message = 'Mesaj yetersiz...';
        }


        return errors;
    }


    useEffect(() => {

        gsap.fromTo(".contact-section .form-group",
            {
                y: -40,
                opacity: 0,

            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: .25,
                scrollTrigger: {
                    trigger: ".contact-section",
                    toggleActions: "restart none none none",
                    start: "top 100%",
                    end: "bottom 90%",
                }
            }
        )
    }, []);


    const handleContactSubmit = (values, actions) => {
        actions.setSubmitting(true);


        emailjs.send('service_yw7p7jn', 'template_taelj62', { user_name: values.name, user_email: values.email, message: values.message }, '8rnHVwq8jxU7nr7Se')
            .then((result) => {
                setTimeout(() => {
                    actions.setSubmitting(false);
                    toast.success("Mesajınız başarıyla alınmıştır.", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                }, 1500);
            }, (error) => {
                setTimeout(() => {
                    actions.setSubmitting(false);
                    toast.error("Mesajınız alınamadı.", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                }, 1500);
            });


    }

    return (
        <section className='contact-section py-14'>

            <div className="section-title">
                <h2>
                    İletişim
                </h2>
            </div>

            <div className='container mx-auto'>


                <article className='w-full md:w-1/2 mx-auto'>

                    <div className="form-wrapper w-full">

                        <Formik
                            initialValues={{
                                "name": '',
                                "email": '',
                                "message": '',
                            }}
                            onSubmit={handleContactSubmit}
                            validate={FormValidate}
                            validateOnSubmit={true}
                            validateOnChange={true}
                            validateOnBlur={false}
                        >
                            {({ isSubmitting }) => (
                                <Form>

                                    <div className="form-inner flex flex-col gap-4">
                                        <div className="form-group">
                                            <label htmlFor="name">Adınız</label>
                                            <Field  name="name" id="name" placeholder="Adınız" className="contact-form-input" />
                                            <div className="error">
                                                <ErrorMessage name='name' />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">E-Mail</label>
                                            <Field type="email" id="email" name="email" placeholder="Mail Adresiniz" className="contact-form-input" />
                                            <div className="error">
                                                <ErrorMessage name='email' />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="message">Mesaj</label>
                                            <Field name="message" id="message" as="textarea" placeholder="Mesajınız..." className="contact-form-input h-full" />
                                            <div className="error">
                                                <ErrorMessage name='message' />
                                            </div>

                                        </div>
                                        <button type='submit' disabled={isSubmitting ? true : false} className='button-filled-v1 disabled:bg-indigo-600 disabled:hover:bg-white disabled:cursor-not-allowed' >
                                            {
                                                isSubmitting ?
                                                    (
                                                        <div className='flex justify-center items-center gap-2'>
                                                            <span>
                                                                Gönderiliyor
                                                            </span>
                                                            <span className='animate-spin'>
                                                                <AiOutlineLoading3Quarters />
                                                            </span>
                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        <span>Gönder</span>
                                                    )
                                            }
                                        </button>
                                    </div>
                                    <ToastContainer

                                    />
                                </Form>
                            )}
                        </Formik>
                    </div>
                </article>

            </div>
        </section >
    )
}

export default ContactSection