import SignInForm from "@/components/auth/SignInForm";
import SocialLogins from "@/components/auth/SocialLogins";
import AnimateOnce from "@/components/common/AnimateOnce";
import AuthBanner from "@/components/common/AuthBanner";
import Title from "@/components/common/Title";

import { useSession } from "next-auth/react";
import PageLoader from "@/components/ui/page-loader";
import { useAuth } from "@/lib/provider/auth-provider";
import { useEffect } from "react";
import { useRouter } from "next/router";
import {
  HOME,
  LOGIN_PAGE,
  PRIVACY_POLICY,
  TERMS_AND_CONDITION,
} from "@/lib/routes";
import SEOHead from "@/components/seo/SeoHead";
import PageStructuredData from "@/components/seo/PageStructuredData";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const redirect = router.query?.redirect as string;
  const { data: session, status } = useSession();
  const { isAuthenticated } = useAuth();
  const pageName = "Login - Access Your Account";
  const pageDescription =
    "Log in to your CraftersWealth account to access your personalized portfolio, insights, and more. Sign in with your credentials or use social logins.";

  useEffect(() => {
    if (isAuthenticated()) {
      router.push(redirect ? redirect : HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, session]);

  if (isAuthenticated()) {
    return <PageLoader />;
  }

  return (
    <main className="lg:grid flex flex-col gap-6 lg:gap-0 lg:grid-cols-2 min-h-[calc(100vh-100px)]">
      <SEOHead
        title={pageName}
        description={pageDescription}
        keywords="login, sign in, user authentication, social login, CraftersWealth"
      />

      <PageStructuredData
        name={pageName}
        description={pageDescription}
        url={LOGIN_PAGE}
      />
      <AuthBanner />
      <section className="flex justify-center items-center flex-col gap-6">
        <div className="flex flex-col justify-center items-center gap-1">
          <Title
            noAnimate
            text="Login"
            size="H2"
            className="!w-max text-center flex justify-center items-center text-4xl !m-0"
          />
          <p className="text-gray-700 text-base">
            Enter your credentials to login
          </p>
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
        <AnimateOnce>
          <div className="pb-16">
            <SocialLogins />
            <SignInForm />
          </div>
        </AnimateOnce>
      </section>
    </main>
  );
};

export default Login;
