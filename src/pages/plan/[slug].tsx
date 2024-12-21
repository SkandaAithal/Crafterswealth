import Title from "@/components/common/Title";
import Typewriter from "@/components/common/TypeWriter";
import PlansStructuredData from "@/components/seo/PlansStructuredData";
import SEOHead from "@/components/seo/SeoHead";
import PlansLayout from "@/components/subcription-and-plan/PlansLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { useWindowWidth } from "@/lib/hooks/use-window-width";
import { useApp } from "@/lib/provider/app-provider";
import { useAuth } from "@/lib/provider/auth-provider";
import { GET_PRODUCT_PLANS } from "@/lib/queries/products.query";
import { PRODUCTS } from "@/lib/routes";
import { Plan, ProductResponse } from "@/lib/types/plan";
import { decodeNumericId, isEmpty } from "@/lib/utils";
import { useLazyQuery } from "@apollo/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

const PlansPage = ({ slug }: { slug: string }) => {
  const [isPremium, setIsPremium] = useState(false);
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(true);
  const { user, isUserSubscribedToEitherCategory } = useAuth();
  const { products } = useApp();

  const [getPlans, { data, loading }] =
    useLazyQuery<ProductResponse>(GET_PRODUCT_PLANS);

  const isLoading = isChecked || loading;

  const pageName = "Plans & Pricing - Choose Your Investment Plan";
  const pageDescription = "Unlock High Returns with Our Flexible Plans";
  const plansApiData = data?.product?.plans ?? [];
  const plansFromState =
    products.find((product) => product.id === slug)?.plans ?? [];

  const plans = !isEmpty(plansFromState)
    ? plansFromState
    : !isEmpty(plansApiData)
      ? plansApiData
      : [];

  useEffect(() => {
    if (slug && isEmpty(products)) {
      getPlans({ variables: { id: slug } });
    }
  }, [slug, products, getPlans]);

  useEffect(() => {
    if (slug) {
      const productId = decodeNumericId(slug as string);
      if (
        !isUserSubscribedToEitherCategory() &&
        user.bought?.includes(productId.toString())
      ) {
        router.push(PRODUCTS);
      } else {
        setIsChecked(false);
      }
    }
  }, [isUserSubscribedToEitherCategory, slug, user.bought, router]);

  const { windowWidth } = useWindowWidth();

  let skeletonCount = 3;
  if (windowWidth && windowWidth < 768) {
    skeletonCount = 1;
  } else if (windowWidth && windowWidth >= 768 && windowWidth < 1024) {
    skeletonCount = 2;
  }

  const checkIfPremium = (val: boolean) => setIsPremium(val);

  return (
    <main
      className={twMerge(
        "transition-colors duration-500 min-h-screen",
        isPremium
          ? "bg-gradient-to-b from-primary-blue-30 to-primary"
          : "bg-gradient-to-b from-[#c8ecfc] to-primary"
      )}
    >
      <SEOHead
        title={pageName}
        description={pageDescription}
        keywords="investment plans, pricing, subscription plans, financial plans, CraftersWealth"
      />
      <PlansStructuredData
        name={pageName}
        description={pageDescription}
        planCategories={plans}
        id={(slug as string) ?? ""}
      />
      <div className="relative text-center layout h-40">
        <Link href={PRODUCTS}>
          <div className="absolute top-3 md:left-10 left-5 flex gap-1 items-center font-bold">
            <IoArrowBack size={24} />
            Back
          </div>
        </Link>
        <Title text="Plans & Pricing" />
        <Typewriter text={pageDescription} />
      </div>

      <section className="layout !pt-8 pb-16">
        {!isEmpty(plans) && !isLoading ? (
          <PlansLayout
            loading={isLoading}
            plans={plans as Plan[]}
            checkIfPremium={checkIfPremium}
          />
        ) : (
          <div className="flex justify-center mt-8 mx-auto gap-8">
            {Array.from({ length: skeletonCount }).map((_, index) => (
              <Skeleton key={index} className="h-[500px] w-[350px]" />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug;

  if (!slug) {
    return {
      redirect: {
        destination: PRODUCTS,
        permanent: false,
      },
    };
  }

  return {
    props: {
      slug,
    },
  };
};
export default PlansPage;
