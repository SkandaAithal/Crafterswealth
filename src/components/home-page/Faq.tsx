import { useMemo, useRef, useState } from "react";
import Title from "../common/Title";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { FAQ_DATA } from "@/lib/constants";
import { AiFillSignal } from "react-icons/ai";
import { SwiperSlide } from "swiper/react";
import SwiperComponent from "../common/SwiperComponent";
import { getFirstIfArray } from "@/lib/utils";
import { Swiper as SwiperType } from "swiper/types";
const FAQ = () => {
  const swiperRef = useRef<SwiperType>(null);

  const faqCategories = useMemo(
    () => Object.keys(FAQ_DATA) as (keyof typeof FAQ_DATA)[],
    []
  );

  const [selectedCategory, setSelectedCategory] = useState<
    keyof typeof FAQ_DATA
  >(getFirstIfArray(faqCategories) as keyof typeof FAQ_DATA);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-10">
      <div className="lg:p-6 md:p-3 rounded-xl hidden md:block bg-primary-blue-80 text-primary w-full mx-auto shadow-xl">
        <Title text="FAQ Category" size="H2" />
        <ul className="grid gap-1 lg:px-4">
          {faqCategories.map((category) => (
            <li
              key={category}
              className={`capitalize cursor-pointer flex gap-2 p-3 rounded-md justify-start items-center transition-all duration-300 ${
                selectedCategory === category
                  ? "font-bold bg-primary-blue-100"
                  : "hover:bg-primary-blue-100/30"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              <AiFillSignal size={16} className="text-primary-blue" />
              {category}
            </li>
          ))}
        </ul>
      </div>

      <div className="block md:hidden">
        <Title text="FAQ Category" size="H2" className="text-center mb-6" />
        <SwiperComponent
          slidesPerView={3}
          centeredSlides={true}
          loop={true}
          spaceBetween={5}
          onSlideChange={(swiper) => {
            const selectedIndex = swiper.realIndex;
            setSelectedCategory(faqCategories[selectedIndex]);
          }}
          onSwiper={(swiper) => ((swiperRef.current as SwiperType) = swiper)}
          initialSlide={faqCategories.indexOf(selectedCategory)}
        >
          {faqCategories.map((category, index) => (
            <SwiperSlide key={category}>
              <div
                className={`capitalize cursor-pointer text-center text-sm p-3 rounded-md transition-all shadow-inner duration-300 ${
                  selectedCategory === category
                    ? "font-bold bg-primary-blue-100 text-primary"
                    : "bg-accent"
                }`}
                onClick={() => {
                  setSelectedCategory(category);

                  (swiperRef.current as SwiperType).slideToLoop(index);
                }}
              >
                {category}
              </div>
            </SwiperSlide>
          ))}
        </SwiperComponent>
      </div>

      <div className="col-span-2">
        <Accordion type="single" collapsible>
          {FAQ_DATA[selectedCategory].map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="font-semibold text-xl !text-left transition-all duration-300">
                <div className="space-x-4 flex justify-center items-center">
                  <p>{item.question}</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-base transition-all duration-300">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
