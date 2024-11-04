import SwiperComponent from "@/components/common/SwiperComponent";
import Title from "@/components/common/Title";
import ProductCard from "@/components/products/ProductCard";
import StocksBarChart from "@/components/products/StocksBarChart";
import TargetsReached from "@/components/products/TargetsReached";

import client from "@/lib/apollo-client";
import useStockData from "@/lib/hooks/use-stock-data";
import { useApp } from "@/lib/provider/app-provider";
import {
  GET_PRODUCT_CATEGORIES,
  GET_PRODUCTS,
} from "@/lib/queries/products.query";
import { AppActionTypes } from "@/lib/types/common/app";
import { ProductsProps } from "@/lib/types/products";
import { GetStaticProps, NextPage } from "next";
import React, { useEffect, useMemo } from "react";
import { Autoplay } from "swiper/modules";
import { SwiperSlide } from "swiper/react";

const Products: NextPage<ProductsProps> = ({ products }) => {
  const { appDispatch } = useApp();

  const SYMBOLS = useMemo(
    () => products.map((product) => product.stock.stockSymbol),
    [products]
  );
  const { stockData, loading } = useStockData(SYMBOLS);

  useEffect(() => {
    appDispatch({ type: AppActionTypes.ADD_PRODUCT, payload: products });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderProducts = () => (
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
        {[...products, ...products].map((product, idx) => {
          const currentPrice = stockData.find(
            (data) => data.symbol === product.stock.stockSymbol
          )?.price;

          return (
            <SwiperSlide key={idx}>
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

  return (
    <main>
      <section className="text-center banner-2 md:text-start grid md:grid-cols-2 layout pb-10">
        <Title text="Today's Must Buy" />
      </section>
      <section className="max-w-screen-xl mx-auto"> {renderProducts()}</section>
      <section className="bg-gradient-to-t layout from-accent to-white flex flex-col md:flex-row gap-10 justify-between items-center !pb-16 !pt-5">
        <div className="space-y-10">
          <div className="">
            <Title text="Our Proven Success" size="H2" />
            <p className="max-w-screen-sm">
              Backed by years of experience and a team of seasoned analysts,
              CraftersWealth boasts of an impressive 96% success rate.
            </p>
          </div>
          <TargetsReached onlyTargets />
        </div>
        <StocksBarChart />
      </section>
    </main>
  );
};

export default Products;

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
