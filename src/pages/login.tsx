import SignInForm from "@/components/auth/SignInForm";
import SocialLogins from "@/components/auth/SocialLogins";
import AnimateOnce from "@/components/common/AnimateOnce";
import AuthBanner from "@/components/common/AuthBanner";
import Title from "@/components/common/Title";
import { getServerSession } from "next-auth";
import { GetServerSideProps } from "next";
import { authConfig } from "@/lib/utils/auth/authConfig";
import { HOME } from "@/lib/routes";
import { useSession } from "next-auth/react";
import PageLoader from "@/components/ui/page-loader";

const Login = () => {
  const { status } = useSession();
  if (status === "authenticated") {
    return <PageLoader />;
  }

  return (
    <main className="lg:grid flex flex-col gap-6 lg:gap-0 lg:grid-cols-2 min-h-[calc(100vh-100px)]">
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authConfig);
  const { query } = context;
  const redirectUrl = query.redirect || HOME;

  if (session) {
    return {
      redirect: {
        destination: redirectUrl as string,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Login;
