import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { Input } from "../ui/input";
import { SignInFormData } from "@/lib/types/common/user";
import { handleSendVerificationEmail, signInFormSchema } from "@/lib/utils";
import Link from "next/link";
import { FORGOT_PASSWORD_PAGE, HOME, SINGN_UP_PAGE } from "@/lib/routes";
import { toast } from "@/lib/hooks/use-toast";
import { useApp } from "@/lib/provider/app-provider";
import { AppActionTypes } from "@/lib/types/app";
import { useRouter } from "next/router";

function SignInForm() {
  const router = useRouter();
  const redirect = router.query?.redirect as string;
  const { appDispatch, verifyEmail, isMounted } = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifyEmailLoading, setIsVerifyEmailLoading] = useState(false);
  const [error, setError] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const showModal = (bool: boolean) =>
    appDispatch({
      type: AppActionTypes.TOGGLE_VERIFY_EMAIL_MODAL,
      payload: bool,
    });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleVerifyEmailClick = async () => {
    await handleSendVerificationEmail({
      appDispatch,
      email: verifyEmail.email,
      expire: verifyEmail.expire,
      setIsVerifyEmailLoading,
    });
    showModal(true);
  };

  const handleSignInWithCredentials = async (data: SignInFormData) => {
    setIsLoading(true);
    setError({});

    const validationErrors = await form.trigger();
    if (!validationErrors) {
      setIsLoading(false);
      return;
    }

    appDispatch({
      type: AppActionTypes.SET_EMAIL,
      payload: "",
    });

    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      if (
        result.error ===
        "Your email address has not been verified. Please verify your email before proceeding."
      ) {
        appDispatch({
          type: AppActionTypes.SET_EMAIL,
          payload: form.getValues("email"),
        });
        toast({
          title: "Verify your email",
          description: result.error?.toString(),
          variant: "destructive",
        });
      } else if (result.error.includes("password")) {
        setError((prev) => ({ ...prev, password: result.error?.toString() }));
      } else if (result.error.includes("email")) {
        setError((prev) => ({ ...prev, email: result.error?.toString() }));
      } else {
        setError((prev) => ({
          ...prev,
          general: result.error?.toString() ?? undefined,
        }));
      }
    } else {
      toast({
        title: "Login Successful",
        description: "Welcome back! You have successfully logged in.",
      });
      router.push(redirect ? redirect : HOME);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    appDispatch({ type: AppActionTypes.SET_FORGOT_PASSWORD_DEFAULT });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSignInWithCredentials)}
          className="space-y-4 w-[340px]"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your email"
                    {...field}
                    className={
                      error.email || form.formState.errors.email
                        ? "border-2 border-destructive"
                        : ""
                    }
                  />
                </FormControl>
                {error.email && (
                  <FormMessage className="text-destructive">
                    {error.email}
                  </FormMessage>
                )}
                {form.formState.errors.email && !error.email && (
                  <FormMessage className="text-destructive">
                    {form.formState.errors.email.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...field}
                      className={
                        error.password || form.formState.errors.password
                          ? "border-2 border-destructive"
                          : ""
                      }
                    />
                    <div
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <IoMdEyeOff className="h-5 w-5 text-gray-500" />
                      ) : (
                        <IoMdEye className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                </FormControl>
                {error.password && (
                  <FormMessage className="text-destructive">
                    {error.password}
                  </FormMessage>
                )}
                {form.formState.errors.password && !error.password && (
                  <FormMessage className="text-destructive">
                    {form.formState.errors.password.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
          {error.general && (
            <FormMessage className="text-destructive">
              {error.general}
            </FormMessage>
          )}
          <div className="mt-6 space-y-2">
            <Link
              href={FORGOT_PASSWORD_PAGE}
              className="text-primary-blue text-base"
            >
              Forgot password?
            </Link>
            <Button
              type="submit"
              className="w-full shadow-lg  h-auto px-3 py-2.5"
              loading={isLoading}
              disabled={isLoading}
            >
              Login
            </Button>
          </div>
        </form>

        {isMounted && !!verifyEmail.email && (
          <Button
            className="w-fit !mt-6 bg-primary-blue-100 hover:bg-primary-blue-80 !h-auto py-2 px-6 text-sm "
            onClick={handleVerifyEmailClick}
            loading={isVerifyEmailLoading}
          >
            Verify Email
          </Button>
        )}
      </Form>
      <div className="mt-4">
        <Link href={SINGN_UP_PAGE} className="text-primary-blue text-base">
          New to CraftersWealth? Create an account
        </Link>
      </div>
    </>
  );
}

export default SignInForm;
