import Title from "@/components/common/Title";
import Typewriter from "@/components/common/TypeWriter";
import PlansStructuredData from "@/components/seo/PlansStructuredData";
import SEOHead from "@/components/seo/SeoHead";
import PlansLayout from "@/components/subcription-and-plan/PlansLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { useWindowWidth } from "@/lib/hooks/use-window-width";
import { useApp } from "@/lib/provider/app-provider";
import { GET_PRODUCT_PLANS } from "@/lib/queries/products.query";
import { PRODUCTS } from "@/lib/routes";
import { Plan, ProductResponse } from "@/lib/types/plan";
import { isEmpty } from "@/lib/utils";
import { useLazyQuery } from "@apollo/client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

const PlansPage = () => {
  const [isPremium, setIsPremium] = useState(false);
  const param = useParams();
  const { products } = useApp();
  const slug = param?.slug ?? "";
  const [getPlans, { data, loading }] =
    useLazyQuery<ProductResponse>(GET_PRODUCT_PLANS);

  const pageName = "Plans & Pricing - Choose Your Investment Plan";
  const pageDescription =
    "Discover investment plans tailored to your goals. Compare pricing and choose the plan that offers the best return on investment.";
  const plansApiData = data?.product?.plans;
  const plansFromState =
    products.find((product) => product.id === slug)?.plans ?? [];

  const plans = isEmpty(plansFromState)
    ? isEmpty(plansApiData)
      ? []
      : plansApiData
    : plansFromState;

  useEffect(() => {
    if (slug && isEmpty(products)) {
      getPlans({ variables: { id: param.slug } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, products]);

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
          ? "bg-gradient-to-b from-[#e1e8ff] to-primary"
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
        planCategories={plans ?? []}
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
        <Typewriter text="Invest wisely with Plans that offer the best return on your investment" />
      </div>

      <section className="layout !pt-8 pb-16">
        {!isEmpty(plans) && !loading ? (
          <PlansLayout
            loading={loading}
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

export default PlansPage;
