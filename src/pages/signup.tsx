import SignUpForm from "@/components/auth/SignUpForm";
import SocialLogins from "@/components/auth/SocialLogins";
import AnimateOnce from "@/components/common/AnimateOnce";
import AuthBanner from "@/components/common/AuthBanner";
import Title from "@/components/common/Title";
import { HOME } from "@/lib/routes";
import { isTokenExpired } from "@/lib/utils/auth";
import { authConfig } from "@/lib/utils/auth/authConfig";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import React from "react";

const Signup = () => {
  return (
    <main className="lg:grid flex flex-col lg:gap-0 lg:grid-cols-2 min-h-[calc(100vh-100px)]">
      <AuthBanner />
      <section className="grid gap-6 place-content-center py-14">
        <div className="flex flex-col justify-center items-center gap-1">
          <Title
            noAnimate
            text="Sign Up"
            size="H2"
            className="!w-max mx-auto text-center text-4xl !m-0"
          />
          <p className="text-gray-700 text-base">Create your account</p>
        </div>
        <div className="w-[340px] md:min-w-[500px] mx-auto">
          <AnimateOnce>
            <SocialLogins />
            <SignUpForm />
          </AnimateOnce>
        </div>
      </section>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authConfig);
  if (!isTokenExpired(session?.expires)) {
    return {
      redirect: {
        destination: HOME,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
export default Signup;
