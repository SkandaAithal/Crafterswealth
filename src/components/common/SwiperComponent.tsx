import React from "react";
import { Swiper, SwiperProps } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface SwiperComponentProps extends SwiperProps {
  children: React.ReactNode;
}

const SwiperComponent: React.FC<SwiperComponentProps> = ({
  children,
  ...rest
}) => {
  const onSwiper = (swiper: SwiperType) => swiper;

  return (
    <Swiper onSwiper={onSwiper} {...rest}>
      {children}
    </Swiper>
  );
};

export default SwiperComponent;
