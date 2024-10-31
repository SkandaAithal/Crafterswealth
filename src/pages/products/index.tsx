import AnimateOnce from "@/components/common/AnimateOnce";
import Title from "@/components/common/Title";
import StocksBarChart from "@/components/products/StocksBarChart";
import TargetsReached from "@/components/products/TargetsReached";
import { Button } from "@/components/ui/button";
import LazyImage from "@/components/ui/lazy-image";
import { Skeleton } from "@/components/ui/skeleton";
import client from "@/lib/apollo-client";
import useStockData from "@/lib/hooks/use-stock-data";
import { useApp } from "@/lib/provider/app-provider";
import {
  GET_PRODUCT_CATEGORIES,
  GET_PRODUCTS,
} from "@/lib/queries/products.query";
import { PLAN, PRODUCTS_DETAIL } from "@/lib/routes";
import { AppActionTypes } from "@/lib/types/common/app";
import { ProductsPageProps } from "@/lib/types/products";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoTriangle } from "react-icons/io5";

const Products: NextPage<ProductsPageProps> = ({ products }) => {
  const router = useRouter();
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

  const handleBuyNowClick = (id: string) => {
    router.push(`${PLAN}/${id}`);
  };

  const handleReadMoreClick = (slug: string, id: string) => {
    router.push(`${PRODUCTS_DETAIL}/?type=${slug}&id=${id}`);
  };

  const renderProducts = () => (
    <div className="layout grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20 md:min-h-[530px]">
      {products
        .map(({ featuredImage, id, name, productCategories, stock }) => {
          const currentPrice = stockData.find(
            (data) => data.symbol === stock.stockSymbol
          )?.price;
          const potential = currentPrice
            ? ((stock.target - currentPrice) / currentPrice) * 100
            : 0;
          return (
            <AnimateOnce key={id}>
              <div className="relative transition-all duration-300 md:hover:scale-110 group h-auto cursor-default hover:text-primary">
                <div className="absolute z-20 -top-10 left-1/2 w-24 h-24 -translate-x-1/2 bg-blue-950 group-hover:bg-black rounded-full p-3 transition-colors duration-300">
                  <LazyImage
                    className="mx-auto object-contain"
                    src={featuredImage?.node?.sourceUrl ?? ""}
                    alt={featuredImage?.node?.altText ?? ""}
                    height={60}
                    width={60}
                    isLazyLoad
                    skeletonClassName="rounded-full"
                  />
                </div>

                <div className="relative text-center space-y-4 bg-accent rounded-xl shadow-lg px-6 pt-12 pb-10 overflow-hidden">
                  <div className="absolute inset-0 z-0 opacity-0 bg-[#353faf] transition-opacity duration-300 group-hover:opacity-100 bg-product-bg-img bg-cover bg-top"></div>
                  <div className="absolute opacity-0 transition-opacity duration-300 group-hover:opacity-100 inset-0 z-10 bg-gradient-to-t from-primary-blue-100 via-primary-blue-80 via-50% via-[#2244a1] via-65% to-transparent"></div>

                  <div className="relative z-10 space-y-4">
                    <h1 className="font-bold text-2xl">
                      {(productCategories?.nodes ?? []).map((a) => a.name)}
                    </h1>
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold">{name}</h2>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <p>Potential Left</p>
                          <div className="flex items-center justify-center gap-1 !my-5 text-4xl font-extrabold">
                            {loading ? (
                              <Skeleton className="h-10 w-3/5 " />
                            ) : (
                              <>
                                <IoTriangle
                                  className="text-green-400 transform"
                                  size={24}
                                />
                                <span className="text-green-400">
                                  {potential.toFixed(2)}%
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="text-base">
                          <p className="line-clamp-2">{stock.description}</p>
                          <span
                            onClick={() =>
                              handleReadMoreClick(
                                (productCategories?.nodes ?? []).map(
                                  (a) => a.slug
                                )[0],
                                id
                              )
                            }
                            className="cursor-pointer text-primary-blue font-semibold flex gap-1 items-center justify-center"
                          >
                            Read more <FaArrowRightLong />
                          </span>
                        </div>
                        <Button
                          onClick={() => handleBuyNowClick(id)}
                          className="shadow rounded-full w-1/2 hidden mx-auto !mt-4 group-hover:block"
                        >
                          Buy Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnce>
          );
        })
        .reverse()}
    </div>
  );

  return (
    <main>
      <section className="text-center banner-2 md:text-start grid md:grid-cols-2 layout pb-10">
        <Title text="Your Opportunities" />
      </section>
      <section className="max-w-screen-xl mx-auto"> {renderProducts()}</section>
      <section className="bg-gradient-to-t from-accent to-white flex flex-col md:flex-row gap-10 justify-between layout items-center pb-16">
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
