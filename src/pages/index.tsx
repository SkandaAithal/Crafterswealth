import AnimateOnce from "@/components/common/AnimateOnce";
import Title from "@/components/common/Title";
import Typewriter from "@/components/common/TypeWriter";
import FAQ from "@/components/home-page/Faq";
import OrdersNotification from "@/components/home-page/OrdersNotification";
import Testimonials from "@/components/home-page/Testimonials";
import TradingViewTicker from "@/components/home-page/TradingViewTicker";
import ProductsSwiper from "@/components/products/ProductsSwiper";
import StocksBarChart from "@/components/products/StocksBarChart";
import TargetsReached from "@/components/products/TargetsReached";
import { Button } from "@/components/ui/button";
import LazyImage from "@/components/ui/lazy-image";
import client from "@/lib/apollo-client";
import { MarketBarChartGraphData, SYMBOLS_DATA } from "@/lib/constants";
import {
  GET_PRODUCT_CATEGORIES,
  GET_PRODUCTS,
} from "@/lib/queries/products.query";
import { PRODUCTS } from "@/lib/routes";
import { InvestmentType } from "@/lib/types/components/stocks-chart";
import { ProductsProps } from "@/lib/types/products";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";

const Home: NextPage<ProductsProps> = ({ products }) => {
  const router = useRouter();
  const handleredirectToProductsPage = () => router.push(PRODUCTS);

  return (
    <main>
      <section className="banner min-h-[calc(100dvh-75px)] md:min-h-[calc(100dvh-100px)] px-6 md:px-20 lg:px-[144px] gap-3  w-full grid md:grid-cols-2 place-content-center text-center md:text-left ">
        <div className="flex flex-col justify-center items-start md:gap-10  ">
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

          <div className="text-center md:text-start w-full">
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
          isLazyLoad
          skeletonClassName="rounded-xl w-[300px] hidden md:block m-auto h-[500px]"
          className="w-full h-full hidden md:block"
        />
      </section>

      <TradingViewTicker symbols={SYMBOLS_DATA} />

      <section className="bg-gradient-to-b from-accent to-white pt-16 px-0 md:px-[64px] xl:px-[96px] text-center mx-auto space-y-12 ">
        <Title text="Today’s Must Buy" />
        <div className=" md:grid grid-cols-1 lg:grid-cols-3 place-content-center gap-6">
          <div className="md:col-span-2 mask my-auto">
            <ProductsSwiper products={products} />
          </div>
          <div className="flex justify-center xl:justify-end items-center px-4 md:px-0">
            <StocksBarChart
              barChartGraphData={MarketBarChartGraphData}
              primaryInvestMent={InvestmentType.Crafterswealth}
            />
          </div>
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
        return data?.products?.nodes ?? [];
      })
    )
  ).flat();

  return {
    props: {
      products,
    },
    revalidate: 60,
  };
};

export default Home;
