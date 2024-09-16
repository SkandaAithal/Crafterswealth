import Title from "@/components/common/Title";
import Typewriter from "@/components/common/TypeWriter";
import PlansLayout from "@/components/subcription-and-plan/PlansLayout";
import { PRODUCTS } from "@/lib/routes";
import Link from "next/link";
import React from "react";
import { IoArrowBack } from "react-icons/io5";

const PlansPage = () => {
  return (
    <main className="bg-gradient-to-b from-accent to-white ">
      <div className="relative text-center layout h-40">
        <Link href={PRODUCTS}>
          <div className="absolute top-5 left-10 flex gap-1 items-center font-bold">
            <IoArrowBack size={24} />
            Back
          </div>
        </Link>
        <Title text="Plans & Pricing" />
        <Typewriter text="Invest Wisely with Plans That Offer the Best Return on Your Investment" />
      </div>

      <section className="layout pb-16">
        <PlansLayout />
      </section>
    </main>
  );
};

export default PlansPage;
