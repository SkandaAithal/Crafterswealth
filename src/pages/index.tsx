import AnimateOnce from "@/components/common/AnimateOnce";
import Title from "@/components/common/Title";
import Typewriter from "@/components/common/TypeWriter";
import FAQ from "@/components/home-page/Faq";
import OrdersNotification from "@/components/home-page/OrdersNotification";
import Testimonials from "@/components/home-page/Testimonials";
import TradingViewTicker from "@/components/home-page/TradingViewTicker";
import ProductsSwiper from "@/components/products/ProductsSwiper";
import StocksBarChart from "@/components/products/StocksBarChart";
import ProductStructuredData from "@/components/seo/ProductsStructureData";
import SEOHead from "@/components/seo/SeoHead";
import { Button } from "@/components/ui/button";
import LazyImage from "@/components/ui/lazy-image";
import client from "@/lib/apollo-client";
import { MarketBarChartGraphData, SYMBOLS_DATA } from "@/lib/constants";
import useStockData from "@/lib/hooks/use-stock-data";
import {
  GET_PRODUCT_CATEGORIES,
  GET_PRODUCTS,
} from "@/lib/queries/products.query";
import { PRODUCTS } from "@/lib/routes";
import { InvestmentType } from "@/lib/types/components/stocks-chart";
import { ProductNode, ProductsProps } from "@/lib/types/products";
import { GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";
const TargetsReached = dynamic(
  () => import("@/components/products/TargetsReached"),
  {
    ssr: false,
  }
);
const Home: NextPage<ProductsProps> = ({ products, categories = [] }) => {
  const router = useRouter();
  const handleredirectToProductsPage = () => router.push(PRODUCTS);
  const SYMBOLS = useMemo(
    () => products.map((product) => product.stock.stockSymbol),
    [products]
  );
  const { stockData, loading } = useStockData(SYMBOLS, true);

  const filteredProducts = useMemo(() => {
    if (!stockData.length) return [];

    const categoryMap: Record<
      string,
      { product: ProductNode; profit: number }
    > = {};

    products.forEach((product) => {
      const stockSymbol = product.stock.stockSymbol;
      const targetPrice = product.stock.target;
      const threshold = product.productCategories.nodes[0]?.threshold;

      const stock = stockData.find((data) => data.symbol === stockSymbol);
      if (!stock) return;

      const profitOrLossPercentage =
        ((targetPrice - stock.price) / targetPrice) * 100;

      if (profitOrLossPercentage > threshold) {
        const category = product.productCategories.nodes[0]?.name;

        if (
          !categoryMap[category] ||
          profitOrLossPercentage > categoryMap[category].profit
        ) {
          categoryMap[category] = { product, profit: profitOrLossPercentage };
        }
      }
    });

    return Object.values(categoryMap).map((entry) => entry.product);
  }, [products, stockData]);

  return (
    <main>
      <SEOHead
        title="CraftersWealth - Investment Made Easy"
        description="CraftersWealth offers expert-backed investment insights and research papers to help you make informed decisions in the stock market."
        keywords="investment insights, stock market tips, research papers, CraftersWealth investments"
      />
      <ProductStructuredData products={products} />
      <section className="banner min-h-[calc(100dvh-75px)] md:min-h-[calc(100dvh-100px)] px-6 md:px-20 lg:px-[144px] gap-3  w-full grid lg:grid-cols-2 place-content-center text-center lg:text-left ">
        <div className="flex flex-col justify-center items-start lg:gap-10">
          <div>
            <Title
              text="Investment Made Easy with"
              className="!text-wrap lg:text-6xl"
            />
            <h1 className="text-3xl md:text-5xl lg:text-6xl mb-4 text-transparent bg-clip-text bg-gradient-to-b from-[#0C1B6C] via-[#2C3E98] to-[#384EC2] font-normal">
              <span className="font-[1000]">Crafters</span>Wealth
            </h1>
            <div className="grid place-content-center">
              <Typewriter
                text="Get daily insights from our research papers on which stocks to buy and when to sell!"
                className="font-semibold text-sm lg:text-xl h-10"
              />
            </div>
          </div>

          <div className="text-center lg:text-start w-full">
            <Button
              onClick={handleredirectToProductsPage}
              className="w-fit mt-5 text-2xl font-bold !px-16 md:!py-3"
            >
              Buy Now
            </Button>
          </div>
        </div>
        <LazyImage
          src="/hero-banner.png"
          alt="banner-image"
          height={300}
          width={300}
          skeletonClassName="rounded-xl m-auto hidden md:block w-[250px] h-[450px]"
          className="w-full lg:h-[300px] xl:h-[400px] hidden md:block 2xl:h-[500px]"
        />
      </section>

      <TradingViewTicker symbols={SYMBOLS_DATA} />

      <section className="bg-gradient-to-b from-accent to-white pt-16 px-0 md:px-[64px] xl:px-[96px] text-center mx-auto space-y-12">
        <Title text="Today’s Must Buy" />
        <div className=" md:grid grid-cols-1 lg:grid-cols-3 place-content-center gap-6">
          <div
            className={twMerge(
              "md:col-span-2 my-auto",
              filteredProducts.length === 1 ? "px-5" : "mask"
            )}
          >
            <ProductsSwiper
              products={filteredProducts}
              categories={categories}
              productsLoading={loading}
            />
          </div>
          <div className="flex justify-center xl:justify-end items-center px-4 md:px-0 mt-6 ">
            <StocksBarChart
              barChartGraphData={MarketBarChartGraphData}
              primaryInvestMent={InvestmentType.Crafterswealth}
            />
          </div>
        </div>
        <div>
          <AnimateOnce>
            <div className="px-4">
              <Title
                text="Benefits of CraftersWealth"
                size="H2"
                className="!mb-12"
              />

              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-screen-md mx-auto">
                {[
                  {
                    title: "Tech-Driven Innovation",
                    description:
                      "Harness cutting-edge technology to deliver smarter, more effective investment strategies.",
                  },
                  {
                    title: "Affordable Expert Solutions",
                    description:
                      "Access premium research and tools without the premium price tag.",
                  },
                  {
                    title: "Comprehensive Stock Insights",
                    description:
                      "Make informed decisions with in-depth analysis and clear recommendations.",
                  },
                  {
                    title: "Exclusive Educational Resources",
                    description:
                      "Gain an edge with specialized content tailored to enhance your investment knowledge.",
                  },
                ].map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-primary shadow-lg rounded-2xl cursor-default px-4 md:px-5 py-6 md:h-44 flex flex-col items-center text-center space-y-4 hover:shadow-xl hover:scale-105 transition-all duration-300 bg-gradient-to-t from-primary-blue-80 to-primary-blue-100 text-primary"
                    >
                      <h3 className="text-[22px] font-bold">{item.title}</h3>
                      <p className="text-base">{item.description}</p>
                    </div>
                  );
                })}
              </section>
            </div>
          </AnimateOnce>
        </div>
        <div className="grid gap-6">
          <TargetsReached />
        </div>
      </section>

      <section className="layout pb-16 space-y-20">
        <AnimateOnce>
          <FAQ />
        </AnimateOnce>

        <AnimateOnce>
          <Testimonials />
        </AnimateOnce>
      </section>
      <OrdersNotification />
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data: categoriesData } = await client.query({
      query: GET_PRODUCT_CATEGORIES,
    });

    const categories = categoriesData?.productCategories?.nodes ?? [];
    const products = (
      await Promise.all(
        categories.map(async ({ name }: { name: string }) => {
          const { data } = await client.query({
            query: GET_PRODUCTS,
            variables: { categories: name },
          });
          const products = data?.products?.nodes ?? [];
          const filterTargetsReachedProducts = products.filter(
            (item: ProductNode) => !item?.stock?.targetReached
          );
          return filterTargetsReachedProducts;
        })
      )
    ).flat();

    return {
      props: {
        products,
        categories,
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      props: {
        products: [],
        categories: [],
      },
      revalidate: 60,
    };
  }
};

export default Home;
