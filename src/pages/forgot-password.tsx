import ForgotPassword from "@/components/auth/ForgotPassword";
import Title from "@/components/common/Title";
import PageLoader from "@/components/ui/page-loader";
import { useApp } from "@/lib/provider/app-provider";
import { FORGOT_PASSWORD_PAGE, LOGIN_PAGE } from "@/lib/routes";
import Link from "next/link";
import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoFingerPrint } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { CgPassword } from "react-icons/cg";
import { BsShieldCheck } from "react-icons/bs";
import SEOHead from "@/components/seo/SeoHead";
import PageStructuredData from "@/components/seo/PageStructuredData";
const ForgotPasswordPage = () => {
  const { forgotPassword, isMounted } = useApp();
  const { step1, step2, step3 } = forgotPassword;
  const steps = Object.keys(forgotPassword).length + 1;
  const activeStep = Object.values(forgotPassword).filter(
    (step) => step.completed
  ).length;

  const getIcon = () => {
    if (step3.completed) {
      return <BsShieldCheck size={50} className="mx-auto" />;
    }
    if (step2.completed) {
      return <CgPassword size={50} className="mx-auto" />;
    }
    if (step1.completed) {
      return <TfiEmail size={50} className="mx-auto" />;
    }
    return <IoFingerPrint size={50} className="mx-auto" />;
  };

  const getTitleAndDescription = () => {
    if (step3.completed) {
      return {
        title: "Password Updated",
        description: "You can now log in with your new password.",
      };
    }
    if (step2.completed) {
      return {
        title: "Set new password",
        description: "Choose a secure password for better protection.",
      };
    }
    if (step1.completed) {
      return {
        title: "Password Reset",
        description: "We've sent you an OTP to reset your password.",
      };
    }

    return {
      title: "Forgot password?",
      description: "No worries, we will send you reset instructions",
    };
  };
  return isMounted ? (
    <main className="min-h-[calc(100dvh-75px)] md:min-h-[calc(100dvh-100px)] relative  grid place-content-center">
      <SEOHead
        title={getTitleAndDescription().title}
        description={getTitleAndDescription().description}
        keywords="forgot password, reset password, account recovery, secure password"
      />
      <PageStructuredData
        name={getTitleAndDescription().title}
        description={getTitleAndDescription().description}
        url={FORGOT_PASSWORD_PAGE}
      />
      <div className="absolute top-10 left-1/2 -translate-x-1/2">
        <div className="flex justify-center items-center gap-4">
          {[...Array(steps)].map((_, index) => (
            <div
              key={index}
              className={`mx-auto mt-4 h-2 w-16 md:w-[100px] rounded-full transition-colors duration-300 ${
                index == activeStep ? "bg-primary-blue" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
      <section className="space-y-4">
        <div className="p-4 border border-gray-200 rounded-2xl shadow-xl mb-10 w-fit mx-auto">
          {getIcon()}
        </div>
        <div className="flex justify-center items-center gap-2 flex-col !mb-8">
          <Title
            noAnimate
            text={getTitleAndDescription().title}
            className="text-center !text-3xl md:!text-4xl lg:!text-[50px] !mb-0"
          />
          <p className="text-base md:text-lg">
            {getTitleAndDescription().description}
          </p>
        </div>
        <ForgotPassword />
        {!step3.completed && (
          <div className="flex justify-center !mt-10">
            <Link href={LOGIN_PAGE}>
              <div className="text-base text-gray-500 flex justify-center items-center gap-3">
                <FaArrowLeftLong />
                Back to Login
              </div>
            </Link>
          </div>
        )}
      </section>
    </main>
  ) : (
    <PageLoader />
  );
};

export default ForgotPasswordPage;
