import Title from "@/components/common/Title";
import Typewriter from "@/components/common/TypeWriter";
import PlansLayout from "@/components/subcription-and-plan/PlansLayout";
import client from "@/lib/apollo-client";
import { GET_PRODUCT_PLANS } from "@/lib/queries/products.query";
import { PRODUCTS } from "@/lib/routes";
import { PlanPageProps, ProductResponse } from "@/lib/types/plan";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

const PlansPage: NextPage<PlanPageProps> = ({ plans }) => {
  const [isPremium, setIsPremium] = useState(false);
  const checkIfPremium = (val: boolean) => setIsPremium(val);

  return (
    <main
      className={twMerge(
        "transition-colors duration-500",
        isPremium
          ? "bg-gradient-to-b from-[#c8ecfc] to-primary"
          : "bg-gradient-to-b from-accent to-primary"
      )}
    >
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
        <PlansLayout plans={plans} checkIfPremium={checkIfPremium} />
      </section>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params!;

  try {
    const { data } = await client.query<ProductResponse>({
      query: GET_PRODUCT_PLANS,
      variables: { id: slug },
    });

    const plans = data?.product?.plans ?? [];

    if (!plans.length) {
      return { notFound: true };
    }

    return { props: { plans } };
  } catch (error) {
    return { notFound: true };
  }
};

export default PlansPage;
