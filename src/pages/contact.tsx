import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { twMerge } from "tailwind-merge";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Title from "@/components/common/Title";
import PageStructuredData from "@/components/seo/PageStructuredData";
import SEOHead from "@/components/seo/SeoHead";
import { CONTACT } from "@/lib/routes";
import Typewriter from "@/components/common/TypeWriter";
import AnimateOnce from "@/components/common/AnimateOnce";
import { useAuth } from "@/lib/provider/auth-provider";
import Link from "next/link";
import { FaEnvelope, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { toast } from "@/lib/hooks/use-toast";
import client from "@/lib/apollo-client";
import { SEND_EMAIL_MUTATION } from "@/lib/queries/users.query";
import { generateContactUsEmailBody } from "@/lib/utils/email-templates/contact-us";
import { capitalizeWords } from "@/lib/utils";
import { SUPPORT_EMAIL } from "@/lib/constants";

const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters." })
    .max(50, { message: "Full name must be less than 50 characters." }),
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .refine(
      (value) =>
        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(value) &&
        /.+\.[a-z]{2,}$/.test(value),
      {
        message:
          "Email must be a valid email address with a proper domain and lowercase letters.",
      }
    )
    .transform((val) => val.trim()),
  subject: z
    .string()
    .min(3, { message: "Subject must be at least 3 characters." })
    .max(100, { message: "Subject must be less than 100 characters." }),
  query: z
    .string()
    .min(3, { message: "Query must be at least 3 characters." })
    .max(500, { message: "Query must be less than 500 characters." }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const pageName = "Contact Us";
  const pageDescription =
    "Contact us for more information about our products, services, and resources. We're always here to help you make informed decisions about your financial future.";

  const defaultValues = {
    fullName: user.firstName ? `${user.firstName} ${user.lastName}` : "",
    email: user.email || "",
    subject: "",
    query: "",
  };
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (user.email) {
      form.reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onSubmit = async (data: ContactFormValues) => {
    setLoading(true);
    try {
      const emailBody = generateContactUsEmailBody(data);

      const response = await client.mutate({
        mutation: SEND_EMAIL_MUTATION,
        variables: {
          input: {
            body: emailBody,
            from: data.email,
            subject: capitalizeWords(data.subject),
            to: SUPPORT_EMAIL,
          },
        },
      });
      if (response?.data?.sendEmail?.sent) {
        form.reset();

        toast({
          title: "Message Sent!",
          description:
            "Thank you for reaching out. We’ll get back to you shortly.",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to send contact us details",
        description: "We were unable to send your details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100dvh-75px)] md:min-h-[calc(100dvh-100px)]">
      <SEOHead
        title={pageName}
        description={pageDescription}
        keywords="Contact CraftersWealth, get in touch, financial advisors, customer support, investment consultation, financial research queries, SEBI registered advisors, connect with CraftersWealth, stock market analysis support, financial insights assistance"
      />
      <PageStructuredData
        name={pageName}
        description={pageDescription}
        url={CONTACT}
      />
      <section className="text-center banner-2 md:text-start layout pb-10 flex flex-col gap-10 lg:flex-row justify-between items-center">
        <div className="flex flex-col max-w-screen-sm">
          <Title text={pageName} className="text-center lg:text-left" />
          <Typewriter
            text="Have questions or need assistance? Don’t hesitate to reach out to us. Our dedicated team is here to help you with your financial journey."
            className="text-center lg:text-left"
          />
        </div>
        <div className="order-1 md:order-2 text-center">
          <Title text="Get in touch" size="H2" noAnimate />
          <div className="flex justify-center space-x-6 mt-4">
            <Link
              href="mailto:support@crafterswealth.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaEnvelope
                className="text-blue-500 hover:scale-125 transition-transform duration-300 ease-in-out"
                size={30}
              />
            </Link>
            <Link
              href="https://www.instagram.com/crafterswealth"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram
                className="text-pink-500 hover:scale-125 transition-transform duration-300 ease-in-out"
                size={30}
              />
            </Link>
            <Link
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp
                className="text-green-500 hover:scale-125 transition-transform duration-300 ease-in-out"
                size={30}
              />
            </Link>
          </div>
        </div>
      </section>
      <AnimateOnce>
        <section className="layout pb-16 max-w-screen-lg mx-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 col-span-2"
            >
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        className={twMerge(
                          form.formState.errors.fullName
                            ? "border-2 border-destructive"
                            : ""
                        )}
                        {...field}
                      />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@email.com"
                        className={twMerge(
                          form.formState.errors.email
                            ? "border-2 border-destructive"
                            : ""
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Subject of your query"
                        className={twMerge(
                          form.formState.errors.subject
                            ? "border-2 border-destructive"
                            : ""
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Query</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your query in detail"
                        className={twMerge(
                          form.formState.errors.query
                            ? "border-2 border-destructive"
                            : ""
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full md:w-fit px-10 !mt-10"
                loading={loading}
              >
                Send Message
              </Button>
            </form>
          </Form>
        </section>
      </AnimateOnce>
    </main>
  );
};

export default Contact;
