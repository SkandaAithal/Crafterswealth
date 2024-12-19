import SignUpForm from "@/components/auth/SignUpForm";
import SocialLogins from "@/components/auth/SocialLogins";
import AnimateOnce from "@/components/common/AnimateOnce";
import AuthBanner from "@/components/common/AuthBanner";
import Title from "@/components/common/Title";
import PageStructuredData from "@/components/seo/PageStructuredData";
import SEOHead from "@/components/seo/SeoHead";
import PageLoader from "@/components/ui/page-loader";
import { useAuth } from "@/lib/provider/auth-provider";
import {
  HOME,
  PRIVACY_POLICY,
  SINGN_UP_PAGE,
  TERMS_AND_CONDITION,
} from "@/lib/routes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Signup = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { isAuthenticated } = useAuth();

  const pageName = "Sign Up - Create Your Account";
  const pageDescription =
    "Create a new account with CraftersWealth to access your personalized portfolio, insights, and exclusive features. Sign up easily with email or social logins.";

  useEffect(() => {
    if (isAuthenticated()) {
      router.push(HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, session]);

  if (isAuthenticated()) {
    return <PageLoader />;
  }
  return (
    <main className="lg:grid flex flex-col lg:gap-0 lg:grid-cols-2 min-h-[calc(100vh-100px)]">
      <SEOHead
        title={pageName}
        description={pageDescription}
        keywords="sign up, create account, registration, user authentication, CraftersWealth"
      />
      <PageStructuredData
        name={pageName}
        description={pageDescription}
        url={SINGN_UP_PAGE}
      />
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

          <div className="text-center px-4 text-base text-gray-700">
            By continuing, you agree to our&nbsp;
            <Link
              href={TERMS_AND_CONDITION}
              className="text-primary-blue font-semibold hover:underline"
            >
              Terms and Conditions
            </Link>
            &nbsp;and&nbsp;
            <Link
              href={PRIVACY_POLICY}
              className="text-primary-blue font-semibold hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </div>
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
