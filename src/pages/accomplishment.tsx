import BreadCrumbsComponent from "@/components/common/BreadCrumbsComponent";
import Title from "@/components/common/Title";
import Typewriter from "@/components/common/TypeWriter";
import dynamic from "next/dynamic";

const TargetsReachedTable = dynamic(
  () => import("@/components/products/TargetsReachedTable"),
  {
    ssr: false,
  }
);
import { ACCOMPLISHMENTS, HOME, PRODUCTS } from "@/lib/routes";
import React, { useEffect, useState } from "react";
import { useApp } from "@/lib/provider/app-provider";
import { getFirstIfArray } from "@/lib/utils";
import { twMerge } from "tailwind-merge";
import { Skeleton } from "@/components/ui/skeleton";

const Accomplishment = () => {
  const { achievements, isAchievementsLoading } = useApp();
  const [selectedCategory, setSelectedCategory] = useState("");

  const pageRoutes = [
    {
      label: "Home",
      href: HOME,
    },
    {
      label: "Opportunities",
      href: PRODUCTS,
    },
    {
      label: "Accomplishment",
      href: ACCOMPLISHMENTS,
    },
  ];

  useEffect(() => {
    const firstCategory = getFirstIfArray(Object.keys(achievements));
    setSelectedCategory(firstCategory);
  }, [achievements]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <main className="pb-16 min-h-screen">
      <section className="text-center banner-2 md:text-start  pb-16">
        <BreadCrumbsComponent routes={pageRoutes} />
        <div className="h-56 layout grid md:grid-cols-2 ">
          <div>
            <Title text="Proven Track Record" />
            <Typewriter text="  Leveraging years of industry experience and a dedicated team of professionals, CraftersWealth achieves an exceptional 96% success rate." />
          </div>
        </div>
      </section>
      <div className="layout flex items-center gap-4">
        {isAchievementsLoading
          ? Array.from({ length: 2 }).map((_, index) => (
              <Skeleton key={index} className="w-32  h-10 shadow-lg" />
            ))
          : Object.keys(achievements).map((category) => (
              <div
                key={category}
                className={twMerge(
                  "w-32 p-2 text-center rounded-lg cursor-pointer shadow-lg",
                  category === selectedCategory
                    ? "bg-primary-blue-100 text-white"
                    : "border"
                )}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </div>
            ))}
        {}
      </div>
      <div className="layout !pt-7 min-h-[60dvh]">
        <TargetsReachedTable
          headerClassName="bg-primary"
          selectedCategory={selectedCategory}
        />
      </div>
    </main>
  );
};

export default Accomplishment;
