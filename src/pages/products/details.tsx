import React from "react";
import { useRouter } from "next/router";
import {
  MarketCapBarChartGraphData,
  PRODUCT_DETAILS_CONFIG,
  STEPS_DETAILS,
} from "@/lib/constants";
import Title from "@/components/common/Title";
import { Button } from "@/components/ui/button";
import { IoArrowBack, IoStatsChartOutline } from "react-icons/io5";
import { HOME, PLAN, PRODUCTS, PRODUCTS_DETAIL } from "@/lib/routes";
import AnimateOnce from "@/components/common/AnimateOnce";
import BreadCrumbsComponent from "@/components/common/BreadCrumbsComponent";
import dynamic from "next/dynamic";
import StocksBarChart from "@/components/products/StocksBarChart";
import { RiPresentationLine, RiStockFill } from "react-icons/ri";
import { IconType } from "react-icons/lib";
import { twMerge } from "tailwind-merge";
import SEOHead from "@/components/seo/SeoHead";
import SingleProductStructuredData from "@/components/seo/SingleProductStructureData";
import BreadcrumbStructuredData from "@/components/seo/BreadCrumbsStructuredData";
import { useWindowWidth } from "@/lib/hooks/use-window-width";
import LazyImage from "@/components/ui/lazy-image";
import { InvestmentType } from "@/lib/types/components/stocks-chart";
import StepsSwiper from "@/components/products/StepsSwiper";

const TargetsReachedTable = dynamic(
  () => import("@/components/products/TargetsReachedTable"),
  {
    ssr: false,
  }
);
const StockDetailsPage = () => {
  const router = useRouter();
  const { type, id } = router.query;
  const { windowWidth } = useWindowWidth();
  const isHideSteps = windowWidth <= 900;
  const productDetails =
    PRODUCT_DETAILS_CONFIG[type as keyof typeof PRODUCT_DETAILS_CONFIG];

  const handleBuyNow = () => {
    if (id) {
      router.push(`${PLAN}/${id}`);
    } else {
      router.push(PRODUCTS);
    }
  };

  if (!productDetails) {
    return (
      <main>
        <SEOHead
          title="Product Not Found - CraftersWealth"
          description="We couldn’t find the product you're looking for. Explore other investment opportunities with CraftersWealth."
        />
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
      </main>
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
      <SEOHead
        title={productDetails.title}
        description={productDetails.aboutStock}
        keywords={`investment, stocks, ${productDetails.title}, ${productDetails.type}`}
      />
      <SingleProductStructuredData
        productDetails={productDetails}
        id={id}
        type={type}
      />
      <BreadcrumbStructuredData routes={pageRoutes} />

      <AnimateOnce>
        <div className="banner-2 pb-16">
          <BreadCrumbsComponent routes={pageRoutes} />
          <section className="flex flex-col-reverse md:flex-row justify-center gap-10 layout min-h-[75dvh]">
            <div className="h-full w-full flex flex-col justify-start items-center lg:px-20">
              <StocksBarChart
                barChartGraphData={
                  (MarketCapBarChartGraphData as any)[
                    productDetails.type as InvestmentType
                  ]
                }
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
              <div className="mt-8 flex justify-start items-center gap-10 text-center">
                <div className="">
                  <div className="bg-primary p-4 border border-gray-200 rounded-2xl shadow-xl mb-5 w-fit mx-auto">
                    <RiStockFill size={30} />
                  </div>
                  <p className="mx-auto text-base font-semibold">
                    SEBI-Registered
                  </p>
                </div>
                <div className="">
                  <div className="bg-primary p-4 border border-gray-200 rounded-2xl shadow-xl mb-5 w-fit mx-auto">
                    <RiPresentationLine size={30} />
                  </div>
                  <p className="mx-auto text-base font-semibold">
                    Expert Research
                  </p>
                </div>
                <div className="">
                  <div className="bg-primary p-4 border border-gray-200 rounded-2xl shadow-xl mb-5 w-fit mx-auto">
                    <IoStatsChartOutline size={30} />
                  </div>
                  <p className="mx-auto text-base font-semibold">
                    Proven Performance
                  </p>
                </div>
              </div>
              <div className="text-center md:text-start">
                <Button
                  onClick={handleBuyNow}
                  className="w-fit mt-5 text-2xl font-bold !px-10 md:!py-3"
                >
                  Buy now
                </Button>
              </div>
            </div>
          </section>
        </div>
      </AnimateOnce>
      <section className="bg-gradient-to-t from-accent to-white layout pb-16">
        <AnimateOnce>
          <div className="mb-10 text-center">
            <h1 className="text-2xl text-gray-700 mb-2">
              An Exhaustive list of
            </h1>
            <Title text="Amazing Features" />

            <p>{productDetails.amazingFeatures}</p>
          </div>
          <section className="grid pb-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7  max-w-4xl mx-auto">
            {productDetails.features.map((feature, index) => {
              const Icon = feature.icon as IconType;
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={twMerge(
                    "bg-primary shadow-lg rounded-2xl cursor-default p-6 flex flex-col items-center text-center space-y-4 hover:shadow-xl hover:scale-105 transition-all duration-300",
                    isEven
                      ? "bg-gradient-to-t from-primary-blue-80 to-primary-blue-100 text-primary"
                      : ""
                  )}
                >
                  <div className="p-4 rounded-full bg-primary-blue">
                    <Icon className="text-2xl text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{feature.title}</h3>
                  <p
                    className={twMerge(
                      "text-sm",
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
        <AnimateOnce>
          <div className="mx-auto px-4">
            {isHideSteps ? (
              <StepsSwiper />
            ) : (
              <div className="grid gap-8 md:grid-cols-4">
                {STEPS_DETAILS.map((step, index) => (
                  <div
                    key={step.step}
                    className="relative flex flex-col items-center text-center"
                  >
                    <div className="md:mb-4 flex h-20 w-20 items-center justify-center rounded-lg bg-teal-50 p-4 shadow-md">
                      <step.icon className="text-teal-500" size={40} />
                    </div>
                    <div
                      className={twMerge(
                        "absolute top-1/2 left-1/2 -translate-x-[10%] xl:-translate-x-[8%] -translate-y-8  items-center",
                        isHideSteps ? "hidden" : "flex",
                        index < STEPS_DETAILS.length - 1 ? " w-full" : "w-fit"
                      )}
                    >
                      <div
                        className={twMerge(
                          "flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-teal-500 text-sm font-semibold text-white z-10 shadow-lg",
                          index < STEPS_DETAILS.length - 1
                            ? ""
                            : "-translate-x-6"
                        )}
                      >
                        {step.step}
                      </div>
                      {index < STEPS_DETAILS.length - 1 && (
                        <div className="ml-5 w-full h-[2px]">
                          <div className="h-full w-full border-t-2 border-dashed border-teal-300"></div>
                        </div>
                      )}
                    </div>
                    <h3
                      className={twMerge(
                        "lg:mt-20 xl:mt-16 mb-2 text-center text-lg font-semibold text-gray-900",
                        isHideSteps ? "mt-4" : "md:mt-32"
                      )}
                    >
                      {step.title}
                    </h3>
                    <p className="text-center text-sm text-gray-600">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </AnimateOnce>

        <AnimateOnce>
          <div className="max-w-screen-lg py-16 mx-auto grid grid-cols-1 gap-20">
            <div>
              <Title
                text="Success Stories of How CraftersWealth Empowers Investors with Innovative Solutions"
                size="H2"
              />

              <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="my-auto h-[400px]">
                  <LazyImage
                    src="/abhishek-success-story.jpg"
                    alt="Abhishek’s Investment Triumph"
                    height={400}
                    width={300}
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">
                    Abhishek’s Investment Triumph
                  </h3>
                  <p className="mt-4">
                    Abhishek was new to the stock market and unsure where to
                    begin. When he joined CraftersWealth, he decided to test the
                    waters with a research paper on Aavas Financiers Ltd.
                  </p>
                  <h4 className="mt-4 font-semibold">
                    From Hesitation to Action
                  </h4>
                  <p>
                    The report’s clear insights and actionable plan gave him the
                    confidence to invest at the recommended buy price of
                    ₹1632.30. For the first time, he felt in control of his
                    investment decisions.
                  </p>
                  <h4 className="mt-4 font-semibold">
                    Success in Just 12 Days
                  </h4>
                  <p>
                    To his delight, the stock hit the target price of ₹1943
                    within just 12 days, earning him an impressive 19.02%
                    return.
                  </p>
                  <blockquote className="mt-4 italic">
                    &quot;CraftersWealth made investing simple and achievable
                    for me. Their research turned my hesitation into
                    success!&quot;
                  </blockquote>
                </div>

                <div>
                  <h3 className="text-2xl font-bold">Dhanush’s Steady Gains</h3>
                  <p className="mt-4">
                    Dhanush Sringeri was familiar with investing but struggled
                    to navigate the complexities of stock analysis. That changed
                    when he turned to CraftersWealth.
                  </p>
                  <h4 className="mt-4 font-semibold">Clarity and Confidence</h4>
                  <p>
                    Dhanush purchased a report on Dabur, following its buy and
                    target recommendations. He appreciated how the analysis
                    removed guesswork and set realistic expectations.
                  </p>
                  <h4 className="mt-4 font-semibold">Profits Made Easy</h4>
                  <p>
                    In a short time, Dabur reached its target, giving him a
                    solid 10.6% return.
                  </p>
                  <blockquote className="mt-4 italic">
                    &quot;CraftersWealth does the hard work, so I can invest
                    confidently. They deliver results without
                    overpromising.&quot;
                  </blockquote>
                </div>
                <div className="my-auto h-[400px]">
                  <LazyImage
                    src="/dhanush-success-story.jpg"
                    alt="Dhanush’s Steady Gains"
                    height={400}
                    width={300}
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </AnimateOnce>

        <section className="space-y-10 mt-6">
          <Title
            text={`Targets Reached from ${productDetails.type}`}
            size="H2"
            className="text-center"
          />
          <TargetsReachedTable
            headerClassName="bg-accent"
            selectedCategory={productDetails.tableKey}
          />
        </section>
      </section>
    </main>
  );
};

export default StockDetailsPage;
