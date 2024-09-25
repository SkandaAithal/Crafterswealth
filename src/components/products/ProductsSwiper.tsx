import { SwiperSlide } from "swiper/react";
import { useState } from "react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { twMerge } from "tailwind-merge";
import { Button } from "../ui/button";
import SwiperComponent from "../common/SwiperComponent";
import { PRODUCTS_CAROUSEL_ITEMS } from "@/lib/constants";
import AnimateOnce from "../common/AnimateOnce";
import { useRouter } from "next/router";
import LazyImage from "../ui/lazy-image";

const ProductsSwiper = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <AnimateOnce>
      <div className="mx-auto w-full h-[450px] ">
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
          onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
          modules={[Autoplay, Pagination, EffectCoverflow]}
          pagination={{ clickable: true }}
          breakpoints={{
            320: {
              slidesPerView: 1.5,
              spaceBetween: 0,
            },
            640: {
              slidesPerView: 1.5,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="custom-height-wrapper"
        >
          {PRODUCTS_CAROUSEL_ITEMS.map((item, index) => {
            const isActive = currentSlide === index;

            return (
              <SwiperSlide
                key={item.id}
                className="grid place-content-center cursor-pointer"
              >
                <div
                  className={twMerge(
                    "text-center m-auto p-6 transition-all h-[400px] flex flex-col justify-between items-center duration-300 bg-primary shadow-lg rounded-xl",
                    isActive ? "text-white  bg-primary-blue-80" : ""
                  )}
                >
                  <div className="grid place-content-center gap-4">
                    <div className="bg-blue-950 rounded-full w-16 h-16 mx-auto grid place-content-center">
                      <LazyImage
                        className="object-contain mx-auto"
                        src={item.imgUrl}
                        alt={item.heading}
                        height={40}
                        width={40}
                        isLazyLoad
                        skeletonClassName="rounded-full"
                      />
                    </div>
                    <h1 className="font-bold text-2xl">{item.heading}</h1>

                    <p className="text-base">{item.description}</p>
                  </div>
                  <Button
                    onClick={() => router.push(item.link)}
                    className="w-fit mx-auto !py-2"
                  >
                    Checkout
                  </Button>
                </div>
              </SwiperSlide>
            );
          })}
        </SwiperComponent>
      </div>
    </AnimateOnce>
  );
};

export default ProductsSwiper;
