import React from "react";
import SwiperComponent from "../common/SwiperComponent";
import { Autoplay } from "swiper/modules";
import { TESTIMONIALS } from "@/lib/constants";
import { SwiperSlide } from "swiper/react";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import Title from "../common/Title";
import { Swiper as SwiperType } from "swiper/types";
import { getInitials } from "@/lib/utils";

const Testimonials = () => {
  const handleMouseEnter = (swiper: SwiperType) => {
    if (swiper?.autoplay) {
      swiper.autoplay.stop(); // Stop autoplay on hover
    }
  };

  const handleMouseLeave = (swiper: SwiperType) => {
    if (swiper?.autoplay) {
      swiper.autoplay.start(); // Resume autoplay after hover
    }
  };

  return (
    <>
      <Title text="Testimonials" size="H2" />
      <SwiperComponent
        speed={1500}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          waitForTransition: true,
        }}
        modules={[Autoplay]}
        className="mask mt-10 cursor-default"
        pagination={{ clickable: true }}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 1.5,
          },
          768: {
            slidesPerView: 2,
          },

          1380: {
            slidesPerView: 3,
          },
        }}
        onSwiper={(swiper) => {
          const swiperEl = swiper.el;
          swiperEl.addEventListener("mouseenter", () =>
            handleMouseEnter(swiper)
          );
          swiperEl.addEventListener("mouseleave", () =>
            handleMouseLeave(swiper)
          );
        }}
      >
        {TESTIMONIALS.map(({ id, name, title, testimonial }) => (
          <SwiperSlide key={id} className="md:p-10 p-6  relative">
            <div className="p-8 rounded-3xl  shadow-md text-center space-y-6 border border-t-4 border-r-4 border-l-4 border-b-4 border-t-primary-blue border-r-primary-blue border-l-primary-blue-100 border-b-primary-blue-100 lg:h-80 h-[350px]">
              <div className="text-gray-800 text-lg font-semibold flex justify-center items-center gap-4">
                <div className="rounded-full p-4 text-xl bg-gray-700 text-white w-fit">
                  {getInitials(name)}
                </div>

                <div>
                  {name}
                  <p className="text-gray-600 text-sm">{title}</p>
                </div>
              </div>
              <div className="mt-4 text-gray-700">
                <span className="inline text-base">{testimonial}</span>
              </div>
              <div className=" bg-primary-blue-80 text-accent p-6 absolute -top-6  md:-top-3 md:left-4 left-1 rounded-full w-fit">
                <ImQuotesLeft size={28} className="inline-block" />
              </div>
              <div className=" text-primary-blue-80 bg-accent p-6 shadow-inner absolute bottom-2 md:bottom-3 right-3 md:right-4 rounded-full w-fit">
                <ImQuotesRight size={28} className="inline-block" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </SwiperComponent>
    </>
  );
};

export default Testimonials;
