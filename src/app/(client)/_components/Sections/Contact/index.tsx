"use client";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import "react-toastify/dist/ReactToastify.css";
import { gsap } from "gsap";
import SectionTitle from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Contact, contactSchema } from "@/lib/validations/contact";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const ContactSection = () => {
  const form = useForm<Contact>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactFormWrapper = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (contactFormWrapper.current) {
      gsap.from(contactFormWrapper.current.children, {
        y: 40,
        opacity: 1,
        duration: 1,
        stagger: 0.25,
        scrollTrigger: {
          trigger: contactFormWrapper.current,
          start: "top 80%",
          end: "center 80%",
          scrub: 1,
        },
      });
    }
  }, []);

  const onSubmit = async (values: Contact) => {
    try {
      setIsSubmitting(true);
      const res = await fetch("/api/contact", {
        method: "POST",

        body: JSON.stringify(values),
      });
      if (res.status === 429) {
        return toast({
          title: "Mesaj gönderme limitine ulaştınız",
          description: "lütfen 60 saniye bekleyiniz.",
          variant: "destructive",
        });
      }

      if (!res.ok) throw new Error("Email error");

      toast({
        title: "Mesajınız başarıyla gönderildi",
      });
    } catch (err) {
      toast({
        title: "Mesajınız gönderilirken bir sorun oluştu",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section py-14" id="iletisim">
      <SectionTitle>
        <h2>İletişim</h2>
      </SectionTitle>

      <div className="container">
        <article className="w-full md:w-1/2 mx-auto">
          <div className="form-wrapper w-full">
            {/* <Formik
              initialValues={formInitialValues}
              onSubmit={handleContactSubmit}
              validate={FormValidate}
              validateOnSubmit={true}
              validateOnChange={true}
              validateOnBlur={false}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div
                    className="form-inner flex flex-col gap-4"
                    ref={contactFormWrapper}
                  >
                    <div className="form-group">
                      <label htmlFor="name">Adınız</label>
                      <Field
                        name="name"
                        id="name"
                        placeholder="Adınız"
                        className="contact-form-input"
                      />
                      <div className="error">
                        <ErrorMessage name="name" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">E-Mail</label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Mail Adresiniz"
                        className="contact-form-input"
                      />
                      <div className="error">
                        <ErrorMessage name="email" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Mesaj</label>
                      <Field
                        name="message"
                        id="message"
                        as="textarea"
                        placeholder="Mesajınız..."
                        className="contact-form-input h-full min-h-[150px]"
                      />
                      <div className="error">
                        <ErrorMessage name="message" />
                      </div>
                    </div>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <div className="flex justify-center items-center gap-2">
                          <span>Gönderiliyor</span>
                          <span className="animate-spin">
                            <AiOutlineLoading3Quarters />
                          </span>
                        </div>
                      ) : (
                        <span>Gönder</span>
                      )}
                    </Button>
                  </div>
                  <ToastContainer />
                </Form>
              )}
            </Formik> */}

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
                ref={contactFormWrapper}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adınız</FormLabel>
                      <FormControl>
                        <Input placeholder="Adınız" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mail Adresiniz</FormLabel>
                      <FormControl>
                        <Input placeholder="E-mail" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mesajınız</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Mesajınız" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-center">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <div className="flex justify-center items-center gap-2">
                        <span>Gönderiliyor</span>
                        <span className="animate-spin">
                          <AiOutlineLoading3Quarters />
                        </span>
                      </div>
                    ) : (
                      <span>Gönder</span>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </article>
      </div>
    </section>
  );
};

export default ContactSection;
