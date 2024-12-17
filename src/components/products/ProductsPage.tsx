import { MarketBarChartGraphData } from "@/lib/constants";
import { InvestmentType } from "@/lib/types/components/stocks-chart";
import React, { useEffect, useMemo } from "react";
import StocksBarChart from "./StocksBarChart";
import TargetsReached from "./TargetsReached";
import useStockData from "@/lib/hooks/use-stock-data";
import { useWindowWidth } from "@/lib/hooks/use-window-width";
import { useApp } from "@/lib/provider/app-provider";
import { AppActionTypes } from "@/lib/types/common/app";
import { Autoplay } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import SwiperComponent from "../common/SwiperComponent";
import ProductCard from "./ProductCard";
import { ProductsProps } from "@/lib/types/products";
import Title from "../common/Title";
import { Skeleton } from "../ui/skeleton";
import LazyImage from "../ui/lazy-image";

const ProductsPage: React.FC<ProductsProps> = ({
  products,
  categories = [],
  productsLoading,
}) => {
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
    if (!productsLoading) {
      appDispatch({
        type: AppActionTypes.ADD_PRODUCT,
        payload: { products, categories },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsLoading]);

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
        {productsLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SwiperSlide
                key={index}
                className="flex items-center justify-center"
              >
                <Skeleton className="h-[400px] w-full rounded-lg" />
              </SwiperSlide>
            ))
          : [...products, ...products].map((product, index) => {
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
    if (productsLoading) {
      return renderSwiper();
    } else if (products.length) {
      if (products.length === 1) {
        const singleProduct = products[0];
        const currentPrice = stockData.find(
          (data) => data.symbol === singleProduct.stock.stockSymbol
        )?.price;
        return (
          <div className="layout min-h-[540px]">
            <ProductCard
              product={singleProduct}
              currentPrice={currentPrice as number}
              loading={loading}
              className="mx-auto md:w-[350px]"
            />
          </div>
        );
      }

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
    } else {
      return (
        <div className="min-h-[540px] layout flex flex-col items-center">
          <LazyImage
            src="/no-products.png"
            alt="no products"
            height={400}
            width={400}
            className="mx-auto bg-none"
            skeletonClassName="w-96 mx-auto"
          />
          <h1 className="text-xl md:text-3xl font-semibold text-center my-4">
            No Products Available
          </h1>

          <p className="text-base">
            We’re constantly working to bring you the best products. Please
            check back later, as new items are added regularly.
          </p>
        </div>
      );
    }
  };
  return (
    <>
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
    </>
  );
};

export default ProductsPage;
