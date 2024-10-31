import React, { useEffect, useState } from "react";
import ModalDrawer from "../common/ModalDrawer";
import { useApp } from "@/lib/provider/app-provider";
import { AppActionTypes } from "@/lib/types/common/app";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "../ui/button";
import { toast } from "@/lib/hooks/use-toast";
import { formatTime, handleSendVerificationEmail } from "@/lib/utils";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_META } from "@/lib/queries/users.query";
import { useRouter } from "next/router";
import { LOGIN_PAGE } from "@/lib/routes";

const VerifyEmail: React.FC = () => {
  const router = useRouter();
  const { redirect } = router.query;
  const loginUrl =
    LOGIN_PAGE +
    (redirect ? `?redirect=${encodeURIComponent(redirect as string)}` : "");

  const { appDispatch, verifyEmail } = useApp();
  const { verificationCode, email, expire, isModalOpen } = verifyEmail;
  const [otp, setOtp] = useState<string>("");
  const [isVerifyEmailLoading, setIsVerifyEmailLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  const [updateEmailVerified, { loading }] = useMutation(UPDATE_USER_META, {
    onCompleted: (data) => {
      const status = data?.updateUserMeta?.statusCode;
      const message = data?.updateUserMeta?.message;

      if (status === 200) {
        toast({
          title: "Verification successful",
          description: message,
        });
        appDispatch({
          type: AppActionTypes.SET_TO_DEFAULT,
        });
        router.push(loginUrl);
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
        title: "Error",
        description: "Failed to update email verification status",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (isModalOpen) setOtp("");
  }, [isModalOpen]);
  const showModal = (bool: boolean) =>
    appDispatch({
      type: AppActionTypes.TOGGLE_VERIFY_EMAIL_MODAL,
      payload: bool,
    });

  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  const handleVerifyEmail = () => {
    if (Date.now() < expire) {
      if (otp === verificationCode) {
        updateEmailVerified({
          variables: {
            input: {
              email,
              isEmailVerified: true,
            },
          },
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
        description: "Resend verify email to get a new OTP",
        variant: "destructive",
      });
    }
  };

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

  const isExpired = remainingTime <= 0;

  const customModalElement = (
    <div className="mb-6 flex flex-col justify-center items-center gap-4">
      <p className="text-base">
        Enter the OTP sent to your email to verify your account.
      </p>
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

      <div className="flex justify-center items-center gap-4 text-base">
        {isExpired ? (
          <Button
            variant="transparent"
            className="text-primary-foreground underline-offset-4 hover:underline"
            onClick={() =>
              handleSendVerificationEmail({
                appDispatch,
                email,
                expire,
                setIsVerifyEmailLoading,
              })
            }
            disabled={!isExpired}
            loaderTheme="dark"
            loading={isVerifyEmailLoading}
          >
            Resend mail
          </Button>
        ) : (
          <p>Expire time: {formatTime(remainingTime)}</p>
        )}
      </div>
    </div>
  );

  return (
    <ModalDrawer
      modalTitle="Verify Email"
      isModalOpen={isModalOpen}
      showModal={showModal}
      customModalElement={customModalElement}
      imageUrl="/verify-email-image.jpg"
      primaryBtnText="Verify Email"
      handlePrimaryAction={handleVerifyEmail}
      isPrimaryBtnLoading={loading}
    />
  );
};

export default VerifyEmail;
