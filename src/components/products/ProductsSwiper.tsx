import { SwiperSlide } from "swiper/react";
import { useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/pagination";

import { twMerge } from "tailwind-merge";
import { Button } from "../ui/button";
import SwiperComponent from "../common/SwiperComponent";
import { PRODUCTS_CAROUSEL_ITEMS } from "@/lib/constants";
import AnimateOnce from "../common/AnimateOnce";
import { useRouter } from "next/router";

const ProductsSwiper = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <AnimateOnce>
      <div className="mx-auto w-full max-w-screen-xl h-[450px] ">
        <SwiperComponent
          speed={1500}
          centeredSlides={true}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            waitForTransition: true,
          }}
          onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true }}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
              spaceBetween: 15,
            },
            640: {
              slidesPerView: 1.5,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
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
                    "text-center m-auto p-6 transition-all min-h-[400px] duration-300 bg-accent rounded-xl grid place-content-center gap-6",
                    isActive
                      ? "text-white scale-100 bg-[#0C1B6C]"
                      : "min-h-80 md:scale-75"
                  )}
                >
                  <h1
                    className={twMerge(
                      "font-bold",
                      isActive ? "text-4xl " : "text-2xl"
                    )}
                  >
                    {item.heading}
                  </h1>
                  <p className="text-base">{item.description}</p>

                  <Button
                    variant="secondary"
                    onClick={() => router.push(item.link)}
                    className="w-fit mx-auto"
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
