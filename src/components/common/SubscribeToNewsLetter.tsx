import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "../ui/input";
import axios from "axios";
import { useAuth } from "@/lib/provider/auth-provider";
import { twMerge } from "tailwind-merge";
import { HOME, NEWSLETTER_API, PAGE_MAP } from "@/lib/routes";
import { usePathname } from "next/navigation";

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

type SubscribeToNewsLetterFormData = z.infer<typeof subscriptionFormSchema>;

const SubscribeToNewsLetter: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const pathName = usePathname();
  const source =
    Object.keys(PAGE_MAP)
      .sort((a, b) => b.length - a.length)
      .find((key) => pathName?.startsWith(key)) || HOME;

  const form = useForm<SubscribeToNewsLetterFormData>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: { email: user?.email || "" },
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  useEffect(() => {
    if (user.email) {
      reset({ email: user.email });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.email]);

  const handleSubscription: SubmitHandler<
    SubscribeToNewsLetterFormData
  > = async (data) => {
    setIsLoading(true);

    try {
      const response = await axios.post(NEWSLETTER_API, {
        email: data.email,
        phone: user.phoneNumber,
        source: PAGE_MAP[source as keyof typeof PAGE_MAP],
        firstName: user.firstName || "",
        lastName: user.lastName || "",
      });

      if (response.status === 201) {
        toast({
          title: "Subscription Successful",
          description: `${data.email} has successfully subscribed to the newsletter.`,
        });
      }
    } catch (err) {
      toast({
        title: "Subscription Successful",
        description: `${data.email} has successfully subscribed to the newsletter.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
  );
};

export default SubscribeToNewsLetter;
