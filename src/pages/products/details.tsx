import React from "react";
import { useRouter } from "next/router";
import { STOCK_RESEARCH_CONFIG } from "@/lib/constants";
import Title from "@/components/common/Title";
import { Button } from "@/components/ui/button";
import { IoArrowBack } from "react-icons/io5";
import { HOME, PLAN, PRODUCTS, PRODUCTS_DETAIL } from "@/lib/routes";
import AnimateOnce from "@/components/common/AnimateOnce";
import BreadCrumbsComponent from "@/components/common/BreadCrumbsComponent";
import dynamic from "next/dynamic";
import LazyImage from "@/components/ui/lazy-image";

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
          <section className="grid md:grid-cols-2 gap-10 layout min-h-[75dvh]">
            <LazyImage
              src="/product-details.jpeg"
              alt="product-details"
              height={300}
              width={300}
              isLazyLoad
              className="h-full w-full rounded object-cover m-auto order-1 md:order-2"
            />

            <div className="space-y-9 order-2 md:order-1">
              <div>
                <Title text={productDetails.title} size="H2" />
                <p className="text-lg">{productDetails.aboutStock}</p>
              </div>
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Market Sentiment
                </h3>
                <p className="text-lg">{productDetails.marketSentiment}</p>
              </div>
              <div className="text-center md:text-start">
                <Button
                  onClick={handleBuyNow}
                  className="w-fit mt-5 text-2xl font-bold !px-10 md:!py-3"
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </section>
        </div>
      </AnimateOnce>
      <section className="bg-gradient-to-t from-accent to-white layout pb-16">
        <AnimateOnce>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 md:p-6">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8 transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Why Our Research Is Reliable
              </h3>
              <ul className="list-disc list-inside text-gray-600 text-base pl-5">
                {productDetails.whyReliable.map((point, index) => (
                  <li key={index} className="mb-2">
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8 transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Reasons to Invest
              </h3>
              <ul className="list-disc list-inside text-gray-600 text-base pl-5">
                {productDetails.reasonToBuy.map((reason, index) => (
                  <li key={index} className="mb-2">
                    {reason}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8 transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Investor Profile
              </h3>
              <ul className="list-disc list-inside text-gray-600 text-base pl-5">
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
          <TargetsReachedTable headerClassName="bg-accent" />
        </section>
      </section>
    </main>
  );
};

export default StockDetailsPage;
