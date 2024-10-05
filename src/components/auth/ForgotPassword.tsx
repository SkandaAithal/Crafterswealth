import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/lib/hooks/use-toast";
import { ForgotPasswordFormData } from "@/lib/types/common/user";
import {
  forgotPasswordSchema,
  formatTime,
  generateRandomOTP,
  resetPasswordSchema,
} from "@/lib/utils";
import { useMutation } from "@apollo/client";
import {
  SEND_VERIFY_EMAIL_MUTATION,
  UPDATE_USER_EMAIL_VERIFIED_OR_PASSWORD,
} from "@/lib/queries/users.query";
import { useApp } from "@/lib/provider/app-provider";
import { AppActionTypes } from "@/lib/types/app";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import client from "@/lib/apollo-client";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { IoFingerPrint } from "react-icons/io5";
import { useRouter } from "next/router";
import { LOGIN_PAGE } from "@/lib/routes";

const ForgotPassword = () => {
  const router = useRouter();
  const { appDispatch, forgotPassword } = useApp();
  const {
    step1,
    step2: { expire, verificationCode, completed: step2Completed },
    step3,
  } = forgotPassword;
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [isSendingEmailLoading, setIsSendingEmailLoading] =
    useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isExpired = remainingTime <= 0;

  useEffect(() => {
    if (!expire) return;

    setRemainingTime(Math.max(0, Math.floor((expire - Date.now()) / 1000)));

    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        const updatedTime = Math.max(0, prevTime - 1);
        if (updatedTime === 0) clearInterval(interval);
        return updatedTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [expire]);

  const [updateEmailVerified, { loading }] = useMutation(
    UPDATE_USER_EMAIL_VERIFIED_OR_PASSWORD,
    {
      onCompleted: async (data) => {
        const status = data?.updateUserEmailVerifiedOrPassword?.statusCode;
        const message = data?.updateUserEmailVerifiedOrPassword?.message;

        if (status === 200) {
          toast({
            title: "User Verification successful",
            description: message,
          });
        } else if (status === 202) {
          await handleSendEmailForForgotPasswordOTP(form.getValues("email"));
          appDispatch({
            type: AppActionTypes.FORGOT_PASSWORD_STEP_1,
            payload: form.getValues("email"),
          });
        } else if (status === 205) {
          appDispatch({
            type: AppActionTypes.FORGOT_PASSWORD_STEP_3,
          });
          toast({
            title: message,
            description: "Please login with new credentials",
          });
        } else if (status === 404) {
          toast({
            title: "User not found!",
            description: message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: message,
            variant: "destructive",
          });
        }
      },
      onError: () => {
        toast({
          title: "Opps! Something went wrong",
          description: "Please try again",
          variant: "destructive",
        });
      },
    }
  );

  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const passwordForm = useForm<{
    password: string;
    confirmPassword: string;
  }>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleForgotPasswordStep1 = async (data: ForgotPasswordFormData) => {
    updateEmailVerified({
      variables: {
        input: {
          email: data.email,
        },
      },
    });
  };

  const handleSendEmailForForgotPasswordOTP = async (emailArg = "") => {
    if (Date.now() < expire) {
      return;
    }
    setOtp("");
    const randomOtp = generateRandomOTP();
    const expirationTime = Date.now() + 120 * 1000;
    try {
      setIsSendingEmailLoading(true);

      const response = await client.mutate({
        mutation: SEND_VERIFY_EMAIL_MUTATION,
        variables: {
          input: {
            body: `Your OTP is: <strong>${randomOtp}</strong>`,
            from: "support@crafterswealth.com",
            subject: "User verification OTP",
            to: emailArg ? emailArg : step1.email,
          },
        },
      });
      if (!response?.data?.sendEmail?.sent) {
        toast({
          title: "Failed to send email",
          description:
            "We were unable to send the user verification email. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Email Sent",
        description: `A user verification email has been sent to ${step1.email}. Please check your inbox.`,
      });
      appDispatch({
        type: AppActionTypes.FORGOT_PASSWORD_STEP_2,
        payload: { expire: expirationTime, verificationCode: randomOtp },
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          "An error occurred while sending the user verification email. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSendingEmailLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp) {
      if (Date.now() < expire) {
        if (otp === verificationCode) {
          await updateEmailVerified({
            variables: {
              input: {
                email: step1.email,
                isEmailVerified: true,
              },
            },
          });
          appDispatch({ type: AppActionTypes.FORGOT_PASSWORD_STEP_2_COMPLETE });
          toast({
            title: "User verification successfull",
            description: "You can now set your password",
          });
        } else {
          toast({
            title: "Invalid OTP",
            description: "Please enter correct OTP",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "OTP expired",
          description: "Resend user verification email to get a new OTP",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Please enter OTP",
        description:
          "To verify your account, please enter the OTP sent to your email.",
        variant: "destructive",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSetNewPassword = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    await updateEmailVerified({
      variables: {
        input: {
          email: step1.email,
          password: data.password,
        },
      },
    });
  };

  if (step3.completed) {
    return (
      <div className="flex justify-center">
        <Button onClick={() => router.push(LOGIN_PAGE)}>
          <IoFingerPrint size={24} className="mr-2" /> Go back to Login
        </Button>
      </div>
    );
  }

  if (step2Completed) {
    return (
      <Form {...passwordForm}>
        <form
          onSubmit={passwordForm.handleSubmit(handleSetNewPassword)}
          className="space-y-4 w-[340px] mx-auto"
        >
          <FormField
            control={passwordForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative w-[340px]">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      {...field}
                      className={
                        passwordForm.formState.errors.password
                          ? "border-destructive border-2"
                          : ""
                      }
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
                {passwordForm.formState.errors.password && (
                  <FormMessage className="text-destructive">
                    {passwordForm.formState.errors.password.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={passwordForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative w-[340px]">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      {...field}
                      className={
                        passwordForm.formState.errors.confirmPassword
                          ? "border-destructive border-2"
                          : ""
                      }
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
                {passwordForm.formState.errors.confirmPassword && (
                  <FormMessage className="text-destructive">
                    {passwordForm.formState.errors.confirmPassword.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-80 shadow-lg !mt-2"
              loading={loading}
              disabled={loading}
            >
              Update Password
            </Button>
          </div>
        </form>
      </Form>
    );
  }
  if (step1.completed) {
    return (
      <>
        <div className="flex justify-center items-center">
          <InputOTP maxLength={6} value={otp} onChange={handleOtpChange}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="flex justify-center items-center gap-4 text-base">
          {isExpired ? (
            <Button
              variant="transparent"
              className="text-primary-foreground underline-offset-4 hover:underline"
              onClick={() => handleSendEmailForForgotPasswordOTP()}
              disabled={!isExpired}
              loaderTheme="dark"
              loading={isSendingEmailLoading}
            >
              Resend mail
            </Button>
          ) : (
            <p>Expire time: {formatTime(remainingTime)}</p>
          )}
        </div>
        <div className="flex justify-center">
          <Button
            className="w-80 shadow-lg"
            onClick={handleVerifyOTP}
            disabled={loading}
            loading={loading}
          >
            Continue
          </Button>
        </div>
      </>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleForgotPasswordStep1)}
        className="space-y-4 w-[340px] mx-auto"
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
                    form.formState.errors.email
                      ? "border-destructive border-2"
                      : ""
                  }
                />
              </FormControl>
              {form.formState.errors.email && (
                <FormMessage className="text-destructive">
                  {form.formState.errors.email.message}
                </FormMessage>
              )}
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button
            type="submit"
            className="w-80 shadow-lg !mt-2"
            loading={loading || isSendingEmailLoading}
            disabled={loading || isSendingEmailLoading}
          >
            Reset Password
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ForgotPassword;
