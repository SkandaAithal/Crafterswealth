import { SwiperSlide } from "swiper/react";
import { useEffect, useMemo, useState, useRef } from "react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css/bundle";
import { twMerge } from "tailwind-merge";
import { Button } from "../ui/button";
import SwiperComponent from "../common/SwiperComponent";
import AnimateOnce from "../common/AnimateOnce";
import { useRouter } from "next/router";
import LazyImage from "../ui/lazy-image";
import { ProductsProps } from "@/lib/types/products";
import { useApp } from "@/lib/provider/app-provider";
import useStockData from "@/lib/hooks/use-stock-data";
import { AppActionTypes } from "@/lib/types/common/app";
import { PLAN, PRODUCTS_DETAIL } from "@/lib/routes";
import { FaArrowRightLong } from "react-icons/fa6";
import { Skeleton } from "../ui/skeleton";
import TrendIndicator from "../common/TrendIndicator";
import { Swiper as SwiperType } from "swiper/types";
const ProductsSwiper: React.FC<ProductsProps> = ({ products }) => {
  const router = useRouter();
  const swiperRef = useRef<SwiperType>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { appDispatch } = useApp();
  const halfPaginationCount = products.length;

  const CustomPagination = () => (
    <div className="custom-pagination flex justify-center space-x-2 py-2">
      {Array.from({ length: halfPaginationCount }).map((_, index) => (
        <span
          key={index}
          onClick={() => {
            if (swiperRef.current) {
              swiperRef.current?.slideToLoop(index);
              setCurrentSlide(index);
            }
          }}
          className={twMerge(
            "w-2 h-2 rounded-full transition-all duration-300 ease-in-out cursor-pointer",
            index === currentSlide % halfPaginationCount
              ? "bg-primary-blue scale-125 shadow-lg"
              : "bg-gray-300 scale-100"
          )}
        />
      ))}
    </div>
  );

  const SYMBOLS = useMemo(
    () => products.map((product) => product.stock.stockSymbol),
    [products]
  );
  const { stockData, loading } = useStockData(SYMBOLS);

  const handleBuyNowClick = (id: string) => {
    router.push(`${PLAN}/${id}`);
  };

  const handleReadMoreClick = (slug: string, id: string) => {
    router.push(`${PRODUCTS_DETAIL}/?type=${slug}&id=${id}`);
  };

  useEffect(() => {
    appDispatch({ type: AppActionTypes.ADD_PRODUCT, payload: products });
  }, [appDispatch, products]);

  return (
    <AnimateOnce>
      <SwiperComponent
        speed={1500}
        centeredSlides={true}
        spaceBetween={10}
        loop={true}
        effect="coverflow"
        coverflowEffect={{
          rotate: -40,
          stretch: 0,
          depth: 100,
          modifier: 0.85,
          slideShadows: false,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          waitForTransition: true,
        }}
        onSlideChange={(swiper) => {
          setCurrentSlide(swiper.realIndex);
        }}
        onSwiper={(swiper) => ((swiperRef.current as SwiperType) = swiper)}
        modules={[Autoplay, Pagination, EffectCoverflow]}
        pagination={{
          el: ".custom-pagination",
        }}
        breakpoints={{
          320: { slidesPerView: 1.5, spaceBetween: 0 },
          640: { slidesPerView: 1.5, spaceBetween: 0 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="custom-height-wrapper "
      >
        {[...products, ...products].map((product, index) => {
          const { featuredImage, id, productCategories, stock } = product;
          const currentPrice = stockData.find(
            (data) => data.symbol === product.stock.stockSymbol
          )?.price;
          const potential = currentPrice
            ? ((stock.target - currentPrice) / currentPrice) * 100
            : 0;

          const isActive = currentSlide === index;

          return (
            <SwiperSlide
              key={index}
              className="grid place-content-center cursor-pointer relative"
            >
              <div
                className={twMerge(
                  "text-center absolute inset-0 z-50 group transition-all h-[400px] duration-300 bg-primary shadow-lg rounded-xl overflow-hidden",
                  isActive ? "text-white bg-primary-blue-80" : ""
                )}
              >
                {isActive && (
                  <>
                    <div className="absolute inset-0 rounded-xl z-0 bg-[#353faf] transition-opacity duration-300 bg-product-bg-img bg-cover bg-top"></div>
                    <div className="absolute rounded-xl transition-opacity duration-300 inset-0 z-10 bg-gradient-to-t from-primary-blue-100 via-primary-blue-80 via-50% via-[#2244a1] via-65% to-transparent"></div>
                  </>
                )}
                <div className="flex flex-col justify-between items-center absolute inset-0 z-50 h-full m-auto p-6 pb-10">
                  <div className="grid place-content-center gap-3">
                    <div
                      className={twMerge(
                        "rounded-full w-16 h-16 mx-auto grid place-content-center",
                        isActive ? "bg-black" : "bg-blue-950"
                      )}
                    >
                      <LazyImage
                        className="object-contain mx-auto"
                        src={featuredImage?.node?.sourceUrl ?? ""}
                        alt={featuredImage?.node?.altText ?? ""}
                        height={40}
                        width={40}
                        skeletonClassName="rounded-full"
                      />
                    </div>
                    <h1 className="font-bold text-2xl">
                      {(productCategories?.nodes ?? [])
                        .map((a) => a.name)
                        .join(", ")}
                    </h1>
                    <div className="space-y-2">
                      <p>Potential Left</p>
                      <div className="flex items-center justify-center gap-1 text-4xl font-extrabold">
                        {loading ? (
                          <Skeleton className="h-10 w-3/5" />
                        ) : (
                          <TrendIndicator number={potential} />
                        )}
                      </div>
                    </div>
                    <div className="text-sm">
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
                        className="cursor-pointer text-primary-blue w-fit mx-auto font-semibold flex gap-1 items-center justify-center"
                      >
                        Read more <FaArrowRightLong />
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleBuyNowClick(id)}
                    className="w-fit mx-auto !py-2"
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </SwiperComponent>
      <CustomPagination />
    </AnimateOnce>
  );
};

export default ProductsSwiper;
