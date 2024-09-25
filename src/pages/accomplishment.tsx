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
import React from "react";

const Accomplishment = () => {
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
      <div className="layout">
        <TargetsReachedTable headerClassName="bg-primary" />
      </div>
    </main>
  );
};

export default Accomplishment;
