import React from "react";
import { Swiper, SwiperProps } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

interface SwiperComponentProps extends SwiperProps {
  children: React.ReactNode;
}

const SwiperComponent: React.FC<SwiperComponentProps> = ({
  children,
  ...rest
}) => {
  return <Swiper {...rest}>{children}</Swiper>;
};

export default SwiperComponent;
