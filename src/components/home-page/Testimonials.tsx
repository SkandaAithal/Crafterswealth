import React from "react";
import SwiperComponent from "../common/SwiperComponent";
import { Autoplay } from "swiper/modules";
import { TESTIMONIALS } from "@/lib/constants";
import { SwiperSlide } from "swiper/react";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import { getInitials } from "@/lib/utils";
import Title from "../common/Title";

const Testimonials = () => {
  return (
    <>
      <Title text="Testimonials" size="H2" />
      <SwiperComponent
        speed={1500}
        centeredSlides={true}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          waitForTransition: true,
        }}
        modules={[Autoplay]}
        className="mask mt-10"
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 1.75,
          },
        }}
      >
        {TESTIMONIALS.map(({ id, name, title, testimonial }) => (
          <SwiperSlide key={id}>
            <div className="p-8 bg-accent rounded-xl shadow-md text-center space-y-6 md:h-80 lg:h-60">
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
                <ImQuotesLeft
                  size={24}
                  className="inline-block align-top mr-4"
                />
                <span className="inline">{testimonial}</span>
                <ImQuotesRight
                  size={24}
                  className="inline-block align-top ml-4"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </SwiperComponent>
    </>
  );
};

export default Testimonials;
