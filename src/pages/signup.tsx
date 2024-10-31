import SignUpForm from "@/components/auth/SignUpForm";
import SocialLogins from "@/components/auth/SocialLogins";
import AnimateOnce from "@/components/common/AnimateOnce";
import AuthBanner from "@/components/common/AuthBanner";
import Title from "@/components/common/Title";
import PageLoader from "@/components/ui/page-loader";
import { useAuth } from "@/lib/provider/auth-provider";
import { HOME } from "@/lib/routes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Signup = () => {
  const router = useRouter();
  const { status } = useSession();
  const { user } = useAuth();

  useEffect(() => {
    if (status === "authenticated" && user.id) {
      router.push(HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (status === "authenticated" && user.id) {
    return <PageLoader />;
  }
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

export default Signup;
