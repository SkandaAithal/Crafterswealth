import { FOOTER_ROUTES } from "@/lib/constants";
import Link from "next/link";
import React, { useState } from "react";
import Title from "./Title";
import { FaInstagram, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { PAGES_TO_HIDE_FOOTER } from "@/lib/routes";
import { usePathname } from "next/navigation";
import { z } from "zod";
import { toast } from "@/lib/hooks/use-toast";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "../ui/input";
import { SubscribeToNewsLetterFormData } from "@/lib/types/common/app";
import { twMerge } from "tailwind-merge";
import { useAuth } from "@/lib/provider/auth-provider";

const subscriptionFormSchema = z.object({
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
});

const Footer = () => {
  const pathName = usePathname();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<SubscribeToNewsLetterFormData>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: { email: user.email },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const handleSubscription: SubmitHandler<
    SubscribeToNewsLetterFormData
  > = async (data) => {
    setIsLoading(true);

    try {
      toast({
        title: "Subscription Successful",
        description: `${data.email} has successfully subscribed to the newsletter.`,
      });
    } catch (err) {
      toast({
        title: "Subscription Failed",
        description: "Failed to subscribe. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (PAGES_TO_HIDE_FOOTER.includes(pathName)) return null;

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-3">
        <div className="grid place-content-center gap-4 bg-gradient-to-r h-40 md:h-60 from-primary-blue-100 to-primary-blue-80">
          <Title
            text="Subscribe to our"
            className="text-primary !m-0 !font-extralight"
            size="H2"
          />
          <Title text="NewsLetter" className="text-primary !m-0" size="H1" />
        </div>
        <div className="col-span-2 h-40 md:h-60 px-4 bg-primary-blue-100 flex justify-center items-center">
          <Form {...form}>
            <div className="flex flex-col gap-2">
              <form
                onSubmit={handleSubmit(handleSubscription)}
                className={twMerge(
                  "gap-4 p-1 lg:w-[600px] overflow-hidden flex justify-between items-center rounded-full h-14 bg-primary",
                  errors.email?.message ? "border-2 border-destructive" : ""
                )}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Your email"
                          {...field}
                          className="border-none rounded-full text-xl my-auto lg:w-[400px]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-fit shadow-lg !h-full !px-6"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  Subscribe
                </Button>
              </form>
              <FormMessage className="text-destructive pl-4">
                {errors.email?.message}
              </FormMessage>
            </div>
          </Form>
        </div>
      </section>
      <section className="text-center grid place-content-center gap-4 py-10 px-4 bg-gradient-to-b from-primary-blue-80 to-primary-blue-100 text-primary">
        <div className="flex justify-center gap-1">
          <Title text="CraftersWealth" className="text-primary" size="H2" />
          <p className="text-xs">TM</p>
        </div>
        <div className="flex justify-center gap-8 flex-wrap">
          {FOOTER_ROUTES.map((routemap, idx) => (
            <Link key={idx} href={routemap.route}>
              {routemap.name}
            </Link>
          ))}
        </div>
        <div className="flex justify-center gap-10">
          <div className="bg-white p-4 rounded-full flex items-center justify-center">
            <FaInstagram className="text-3xl text-black" />
          </div>
          <div className="bg-white p-4 rounded-full flex items-center justify-center">
            <FaWhatsapp className="text-3xl text-black" />
          </div>
          <div className="bg-white p-4 rounded-full flex items-center justify-center">
            <FaXTwitter className="text-3xl text-black" />
          </div>
        </div>
        <h1 className="text-base">
          CRAFTERS FINANCIAL RESEARCH PRIVATE LIMITED (Research Analyst) | SEBI
          Regn., No. INH000016117
        </h1>
        <p>
          Copyright &copy; {new Date().getFullYear()} CraftersWealth
          <sup>™</sup>
        </p>
      </section>
    </>
  );
};

export default Footer;
