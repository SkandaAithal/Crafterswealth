import React, { useState, useRef } from "react";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { twMerge } from "tailwind-merge";
import { STEPS_DETAILS } from "@/lib/constants";
import SwiperComponent from "../common/SwiperComponent";
import { Swiper as SwiperType } from "swiper/types";

const StepsSwiper: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const CustomPagination = () => (
    <div className="custom-pagination flex justify-center !mt-6 space-x-2">
      {STEPS_DETAILS.map((step, index) => (
        <span
          key={index}
          onClick={() => {
            if (swiperRef.current) {
              swiperRef.current.slideToLoop(index);
              setCurrentSlide(index);
            }
          }}
          className={twMerge(
            "w-3 h-3 rounded-full transition-all duration-300 ease-in-out cursor-pointer",
            index === currentSlide ? "bg-teal-500 scale-125" : "bg-gray-300"
          )}
        />
      ))}
    </div>
  );

  return (
    <div className="pt-6 h-full">
      <SwiperComponent
        spaceBetween={20}
        slidesPerView={1.5}
        loop
        effect="coverflow"
        centeredSlides
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        className="mask"
        modules={[EffectCoverflow, Pagination, Autoplay]}
        pagination={{ el: ".custom-pagination", clickable: true }}
      >
        {STEPS_DETAILS.map((step, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center text-center transition-transform duration-300 gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-teal-50 p-4 shadow-md">
                <step.icon className="text-teal-500" size={40} />
              </div>
              <div className="rounded-full h-12 w-12 bg-teal-500 text-sm flex justify-center items-center font-semibold text-white shadow-lg">
                {step.step}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </SwiperComponent>
      <CustomPagination />
    </div>
  );
};

export default StepsSwiper;
