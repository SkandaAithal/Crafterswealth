import React from "react";
import { useRouter } from "next/router";
import {
  MarketCapBarChartGraphData,
  STOCK_RESEARCH_CONFIG,
} from "@/lib/constants";
import Title from "@/components/common/Title";
import { Button } from "@/components/ui/button";
import { IoArrowBack, IoStatsChartOutline } from "react-icons/io5";
import { HOME, PLAN, PRODUCTS, PRODUCTS_DETAIL } from "@/lib/routes";
import AnimateOnce from "@/components/common/AnimateOnce";
import BreadCrumbsComponent from "@/components/common/BreadCrumbsComponent";
import dynamic from "next/dynamic";
import StocksBarChart from "@/components/products/StocksBarChart";
import { RiStockFill } from "react-icons/ri";
import { IconType } from "react-icons/lib";
import { twMerge } from "tailwind-merge";

const TargetsReachedTable = dynamic(
  () => import("@/components/products/TargetsReachedTable"),
  {
    ssr: false,
  }
);
const StockDetailsPage = () => {
  const router = useRouter();
  const { type, id } = router.query;

  const productDetails =
    STOCK_RESEARCH_CONFIG[type as keyof typeof STOCK_RESEARCH_CONFIG];

  const handleBuyNow = () => {
    router.push(`${PLAN}/${id}`);
  };

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
        <div className="banner-2 pb-16">
          <BreadCrumbsComponent routes={pageRoutes} />
          <section className="flex flex-col-reverse md:flex-row justify-center gap-10 layout min-h-[75dvh]">
            <div className="h-full w-full flex flex-col justify-start items-center">
              <StocksBarChart
                barChartGraphData={MarketCapBarChartGraphData}
                primaryInvestMent={productDetails.type}
              />
            </div>

            <div className="space-y-9 order-2 md:order-1">
              <div>
                <Title
                  text={productDetails.title}
                  size="H2"
                  className="!mb-2"
                  noAnimate
                />
                <p className="text-xl font-semibold ">
                  {productDetails.subtitle}
                </p>
                <p className="text-lg mt-6">{productDetails.aboutStock}</p>
              </div>
              <div className="mt-8 flex justify-start items-center gap-6 text-center">
                <div className="bg-primary p-6 shadow-lg rounded-xl w-60">
                  <div className="p-4 border border-gray-200 rounded-2xl shadow-xl mb-5 w-fit mx-auto">
                    <RiStockFill size={30} />
                  </div>
                  <p className="mx-auto text-base font-semibold">
                    SEBI Registered analyst
                  </p>
                </div>
                <div className="bg-primary p-6 shadow-lg rounded-xl w-60">
                  <div className="p-4 border border-gray-200 rounded-2xl shadow-xl mb-5 w-fit mx-auto">
                    <IoStatsChartOutline size={30} />
                  </div>
                  <p className="mx-auto text-base font-semibold">
                    96% success rate
                  </p>
                </div>
              </div>
              <div className="text-center md:text-start">
                <Button
                  onClick={handleBuyNow}
                  className="w-fit mt-5 text-2xl font-bold !px-10 md:!py-3"
                >
                  Go to {productDetails.type} Plans
                </Button>
              </div>
            </div>
          </section>
        </div>
      </AnimateOnce>
      <section className="bg-gradient-to-t from-accent to-white layout pb-16">
        <AnimateOnce>
          <section className="grid pb-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-14">
            {productDetails.features.map((feature, index) => {
              const Icon = feature.icon as IconType;
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={twMerge(
                    "bg-primary shadow-lg rounded-2xl cursor-default p-8 flex flex-col items-center text-center space-y-4 hover:shadow-xl hover:scale-105 transition-all duration-300",
                    isEven
                      ? " bg-gradient-to-t from-primary-blue-80 to-primary-blue-100 text-primary"
                      : ""
                  )}
                >
                  <div className="p-6 rounded-full bg-primary-blue">
                    <Icon className="text-3xl text-primary" />
                  </div>
                  <h3 className="text-2xl  font-bold">{feature.title}</h3>
                  <p
                    className={twMerge(
                      "text-base",
                      isEven ? "text-primary" : "text-gray-600"
                    )}
                  >
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </section>
        </AnimateOnce>

        <section className="space-y-10 mt-6">
          <Title
            text={`Targets Reached from ${productDetails.type}`}
            size="H2"
          />
          <TargetsReachedTable headerClassName="bg-accent" />
        </section>
      </section>
    </main>
  );
};

export default StockDetailsPage;
