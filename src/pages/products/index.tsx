import SwiperComponent from "@/components/common/SwiperComponent";
import Title from "@/components/common/Title";
import ProductCard from "@/components/products/ProductCard";
import StocksBarChart from "@/components/products/StocksBarChart";
import ProductStructuredData from "@/components/seo/ProductsStructureData";
import SEOHead from "@/components/seo/SeoHead";
const TargetsReached = dynamic(
  () => import("@/components/products/TargetsReached"),
  {
    ssr: false,
  }
);
import client from "@/lib/apollo-client";
import { MarketBarChartGraphData } from "@/lib/constants";
import useStockData from "@/lib/hooks/use-stock-data";
import { useWindowWidth } from "@/lib/hooks/use-window-width";
import { useApp } from "@/lib/provider/app-provider";
import {
  GET_PRODUCT_CATEGORIES,
  GET_PRODUCTS,
} from "@/lib/queries/products.query";
import { AppActionTypes } from "@/lib/types/common/app";
import { InvestmentType } from "@/lib/types/components/stocks-chart";
import { ProductsProps } from "@/lib/types/products";
import { GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import React, { useEffect, useMemo } from "react";
import { Autoplay } from "swiper/modules";
import { SwiperSlide } from "swiper/react";

const Products: NextPage<ProductsProps> = ({ products }) => {
  const { appDispatch } = useApp();
  const { isMobile } = useWindowWidth();
  const SYMBOLS = useMemo(
    () => products.map((product) => product.stock.stockSymbol),
    [products]
  );
  const DESCRIPTION =
    "Backed by years of experience and a team of seasoned analysts, CraftersWealth boasts of an impressive 96% success rate.";
  const { stockData, loading } = useStockData(SYMBOLS);

  useEffect(() => {
    appDispatch({ type: AppActionTypes.ADD_PRODUCT, payload: products });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderSwiper = () => (
    <div className="layout min-h-[540px] overflow-x-hidden mask-desktop">
      <SwiperComponent
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1.1}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3.1, spaceBetween: 40 },
        }}
        style={{
          overflow: "visible",
        }}
      >
        {[...products, ...products].map((product, index) => {
          const currentPrice = stockData.find(
            (data) => data.symbol === product.stock.stockSymbol
          )?.price;

          return (
            <SwiperSlide key={index}>
              <ProductCard
                product={product}
                currentPrice={currentPrice as number}
                loading={loading}
              />
            </SwiperSlide>
          );
        })}
      </SwiperComponent>
    </div>
  );
  const renderProducts = () => {
    return products.length >= 3 ? (
      renderSwiper()
    ) : isMobile ? (
      renderSwiper()
    ) : (
      <div className="layout min-h-[540px] grid gap-16 md:gap-10 grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto">
        {products.map((product, index) => {
          const currentPrice = stockData.find(
            (data) => data.symbol === product.stock.stockSymbol
          )?.price;

          return (
            <ProductCard
              key={index}
              product={product}
              currentPrice={currentPrice as number}
              loading={loading}
            />
          );
        })}
      </div>
    );
  };

  return (
    <main>
      <SEOHead title="Today's Must Buy" description={DESCRIPTION} />
      <ProductStructuredData products={products} />
      <section className="text-center banner-2 md:text-start grid md:grid-cols-2 layout pb-10">
        <Title text="Today's Must Buy" />
      </section>
      <section className="max-w-screen-xl mx-auto"> {renderProducts()}</section>
      <section className="bg-gradient-to-t layout from-accent to-white flex flex-col md:flex-row gap-10 justify-between items-center !pb-16 !pt-5">
        <div className="space-y-10">
          <div className="">
            <Title text="Our Proven Success" size="H2" />
            <p className="max-w-screen-sm">{DESCRIPTION}</p>
          </div>
          <TargetsReached onlyTargets />
        </div>
        <StocksBarChart
          barChartGraphData={MarketBarChartGraphData}
          primaryInvestMent={InvestmentType.Crafterswealth}
        />
      </section>
    </main>
  );
};

export default Products;

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
  } catch (error) {
    return {
      props: {
        products: [],
      },
      revalidate: 60,
    };
  }
};
