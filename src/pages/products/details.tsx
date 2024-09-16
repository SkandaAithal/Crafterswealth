import React from "react";
import { useRouter } from "next/router";
import { STOCK_RESEARCH_CONFIG } from "@/lib/constants";
import Title from "@/components/common/Title";
import { Button } from "@/components/ui/button";
import { IoArrowBack } from "react-icons/io5";
import { HOME, PRODUCTS, PRODUCTS_DETAIL } from "@/lib/routes";
import Image from "next/image";
import AnimateOnce from "@/components/common/AnimateOnce";
import BreadCrumbsComponent from "@/components/common/BreadCrumbsComponent";
import dynamic from "next/dynamic";

const TargetsReachedTable = dynamic(
  () => import("@/components/products/TargetsReachedTable"),
  {
    ssr: false,
  }
);
const StockDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const productDetails =
    STOCK_RESEARCH_CONFIG[id as keyof typeof STOCK_RESEARCH_CONFIG];

  if (!productDetails) {
    return (
      <div className="text-center min-h-[90dvh] grid place-content-center">
        <Title
          text="We couldn’t find the product you're looking for."
          className="text-wrap"
          size="H2"
        />
        <Button
          variant={"secondary"}
          className="shadow-xl w-fit mx-auto mt-7 flex gap-2 text-xl !px-8"
          onClick={() => router.push(PRODUCTS)}
        >
          <IoArrowBack size={24} />
          Go Back
        </Button>
      </div>
    );
  }

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
      label: productDetails?.title ?? "",
      href: PRODUCTS_DETAIL,
    },
  ];

  return (
    <main>
      <AnimateOnce>
        <BreadCrumbsComponent routes={pageRoutes} />
        <section className="grid md:grid-cols-2 gap-10 layout">
          <div className="m-auto">
            <Image
              src="/product-details.avif"
              alt="product-details"
              height={300}
              width={300}
              className="w-4/5 h-4/5 object-cover m-auto"
            />
          </div>
          <div className="">
            <Title text={productDetails.title} size="H2" />
            <p className="text-gray-600 text-lg">{productDetails.aboutStock}</p>

            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Why Our Research Is Reliable
              </h3>
              <ul className="list-disc list-inside text-gray-600 text-lg">
                {productDetails.whyReliable.map((point, index) => (
                  <li key={index} className="mb-2">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </AnimateOnce>
      <section className="bg-gradient-to-t from-accent to-white layout pb-16">
        <AnimateOnce>
          <div className="p-6 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Market Sentiment
            </h3>
            <p className="text-gray-600 text-lg">
              {productDetails.marketSentiment}
            </p>
          </div>
        </AnimateOnce>
        <AnimateOnce>
          <section className="grid md:grid-cols-2 gap-10">
            <div className="bg-primary rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Reasons to Invest
              </h3>
              <ul className="list-disc list-inside text-gray-600 text-lg">
                {productDetails.reasonToBuy.map((reason, index) => (
                  <li key={index} className="mb-2">
                    {reason}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-primary rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Investor Profile
              </h3>
              <ul className="list-disc list-inside text-gray-600 text-lg">
                {productDetails.investorProfile.map((profile, index) => (
                  <li key={index} className="mb-2">
                    {profile}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </AnimateOnce>
        <section className="space-y-10 mt-6">
          <Title
            text={`Targets Reached from ${productDetails.type}`}
            size="H2"
          />
          <TargetsReachedTable />
        </section>
      </section>
    </main>
  );
};

export default StockDetailsPage;
