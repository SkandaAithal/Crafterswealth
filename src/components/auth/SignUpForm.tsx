import React, { useState } from "react";
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
import { Input } from "../ui/input";
import { SignUpFormData } from "@/lib/types/common/user";
import { handleSendVerificationEmail, signUpFormSchema } from "@/lib/utils";
import Link from "next/link";
import { LOGIN_PAGE } from "@/lib/routes";
import { useMutation } from "@apollo/client";
import { CREATE_USER_SIGNUP } from "@/lib/queries/users.query";
import { toast } from "@/lib/hooks/use-toast";
import { useApp } from "@/lib/provider/app-provider";
import { AppActionTypes } from "@/lib/types/common/app";
import { twMerge } from "tailwind-merge";

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isVerifyEmailLoading, setIsVerifyEmailLoading] = useState(false);

  const { appDispatch, verifyEmail, isMounted } = useApp();
  const { expire } = verifyEmail;
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: undefined,
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const [createUserFromSignUp, { loading }] = useMutation(CREATE_USER_SIGNUP, {
    onCompleted: async (data) => {
      const message = data?.createUserFromSignUp?.message;
      const status = data?.createUserFromSignUp?.statusCode;
      if (status == 409 || status === 500) {
        toast({
          title: "Oops! Something went wrong",
          description: message,
          variant: "destructive",
        });
      } else if (status === 201) {
        toast({
          title: "User created successfully",
          description: message,
        });
        appDispatch({
          type: AppActionTypes.SET_EMAIL,
          payload: form.getValues("email"),
        });
        await handleSendVerificationEmail({
          appDispatch,
          email: form.getValues("email"),
          expire,
          setIsVerifyEmailLoading,
        });
        appDispatch({
          type: AppActionTypes.TOGGLE_VERIFY_EMAIL_MODAL,
          payload: true,
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error Creating User",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSignUp = async (formData: SignUpFormData) => {
    createUserFromSignUp({
      variables: {
        input: {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          password: formData.password,
          phoneNumber: formData.phoneNumber?.toString(),
        },
      },
    });
  };

  const handleVerifyEmailClick = async () => {
    await handleSendVerificationEmail({
      appDispatch,
      email: verifyEmail.email,
      expire: verifyEmail.expire,
      setIsVerifyEmailLoading,
    });
    appDispatch({
      type: AppActionTypes.TOGGLE_VERIFY_EMAIL_MODAL,
      payload: true,
    });
  };

  return (
    <>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSignUp)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="First Name"
                      className={twMerge(
                        "md:w-60",
                        form.formState.errors.firstName
                          ? "border-2 border-destructive"
                          : ""
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.firstName?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Last Name"
                      className={twMerge(
                        "md:w-60",
                        form.formState.errors.lastName
                          ? "border-2 border-destructive"
                          : ""
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.lastName?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Phone Number"
                    {...field}
                    className={twMerge(
                      "w-[340px]",
                      form.formState.errors.phoneNumber
                        ? "border-2 border-destructive"
                        : ""
                    )}
                    onWheel={(e) => e.preventDefault()}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.phoneNumber?.message}
                </FormMessage>
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
                    placeholder="Your email"
                    className={twMerge(
                      "w-[340px]",
                      form.formState.errors.email
                        ? "border-2 border-destructive"
                        : ""
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.email?.message}
                </FormMessage>
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
                  <div className="relative w-[340px]">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className={twMerge(
                        "w-[340px]",
                        form.formState.errors.password
                          ? "border-2 border-destructive"
                          : ""
                      )}
                      {...field}
                    />
                    <div
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
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
                <FormMessage>
                  {form.formState.errors.password?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative w-[340px]">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      className={twMerge(
                        "w-[340px]",
                        form.formState.errors.confirmPassword
                          ? "border-2 border-destructive"
                          : ""
                      )}
                      {...field}
                    />
                    <div
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? (
                        <IoMdEyeOff className="h-5 w-5 text-gray-500" />
                      ) : (
                        <IoMdEye className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage>
                  {form.formState.errors.confirmPassword?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            loading={loading || isVerifyEmailLoading}
            className="w-[340px] shadow-lg !mt-6 h-auto px-3 py-2.5"
          >
            Create account
          </Button>
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
        <Link href={LOGIN_PAGE} className="text-primary-blue text-base">
          Already have an account? Log in
        </Link>
      </div>
    </>
  );
}

export default SignUpForm;
