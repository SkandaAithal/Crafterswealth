import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useApp } from "@/lib/provider/app-provider";
import { InvestmentStatus, PortfolioProps } from "@/lib/types/my-papers";
import SwiperComponent from "../common/SwiperComponent";
import { SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import { formatToIndianNumberingSystem, getFirstIfArray } from "@/lib/utils";
import { twMerge } from "tailwind-merge";
import CategoryCard from "./CategoryCard";
import TrendIndicator from "../common/TrendIndicator";
import { Separator } from "../ui/separator";
import { useWindowWidth } from "@/lib/hooks/use-window-width";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
} from "react-icons/io";

const Portfolio: React.FC<PortfolioProps> = ({
  selectedProductCategory,
  setProductCategory,
  isProductsLoading,
  portfolioProducts,
  boughtProducts,
  setSelectedStatus,
  selectedStatus,
  scrollToTop,
  isMarketPriceLoading,
  setCurrentPage,
}) => {
  const { categories, isAppLoading } = useApp();
  const { isMobile, windowWidth } = useWindowWidth();
  const swiperRef = useRef<SwiperType | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const categoriesArray = [...categories, ...categories];
  const selectedCategory = categories.find(
    (c) => c.slug === selectedProductCategory
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const isLoading = isAppLoading || isProductsLoading;

  const { totalBuyPrice, totalMarketPrice } = portfolioProducts.reduce(
    (acc, product) => {
      acc.totalBuyPrice += product.buyPrice;
      acc.totalMarketPrice += product.marketPrice ?? 0;
      return acc;
    },
    { totalBuyPrice: 0, totalMarketPrice: 0 }
  );

  const TotalNet = totalMarketPrice
    ? ((totalMarketPrice - totalBuyPrice) / totalMarketPrice) * 100
    : 0;

  useEffect(() => {
    if (categoriesArray.length > 0) {
      setProductCategory(getFirstIfArray(categories).slug);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  const handleNext = () => {
    const newIndex = (selectedIndex + 1) % categoriesArray.length;
    setSelectedIndex(newIndex);
    setProductCategory(categoriesArray[newIndex].slug);
    swiperRef.current?.slideToLoop(newIndex);
    setCurrentPage(1);
  };

  const handlePrev = () => {
    const newIndex =
      (selectedIndex - 1 + categoriesArray.length) % categoriesArray.length;
    setSelectedIndex(newIndex);
    setProductCategory(categoriesArray[newIndex].slug);
    swiperRef.current?.slideToLoop(newIndex);
    setCurrentPage(1);
  };

  const handleDropdownToggle = (event: React.MouseEvent) => {
    event.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };

  const handleOptionSelect = (status: InvestmentStatus) => {
    setSelectedStatus(status);
    setDropdownOpen(false);
    scrollToTop();
    setCurrentPage(1);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    if (isDropdownOpen && target && !target.closest(".dropdown")) {
      setDropdownOpen(false);
    }
  };

  const handleTriggerClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (triggerRef.current) {
      const targetValue = isMobile ? 100 : 115;
      const triggerTop = triggerRef.current.getBoundingClientRect().top;
      const targetPosition = window.scrollY + triggerTop - targetValue;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDropdownOpen]);

  const isCategoriesLessThanThree = categories.length < 3;
  return (
    <section className="layout-sm !py-0">
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-8 lg:gap-4 md:py-6">
          <Skeleton className="h-60 my-auto" />
          <div className="col-span-2 flex gap-4">
            {Array(3)
              .fill(0)
              .map((_, idx) => (
                <Skeleton key={idx} className="h-10 md:h-60" />
              ))}
          </div>
          <Skeleton className="h-60 my-auto md:hidden" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-8 lg:gap-4">
          <div className="flex flex-col justify-center">
            <div className="p-6 bg-primary-blue-100 text-primary h-60 shadow-lg rounded-2xl flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Portfolio Value</h2>
                {isMarketPriceLoading ? (
                  <Skeleton className="h-10 w-40" />
                ) : (
                  <h1 className="text-2xl xl:text-3xl font-bold">
                    ₹{formatToIndianNumberingSystem(totalMarketPrice)}
                  </h1>
                )}
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  Total Investment ({portfolioProducts.length})
                </h2>
                <h1 className="text-2xl xl:text-3xl font-bold">
                  ₹{formatToIndianNumberingSystem(totalBuyPrice)}
                </h1>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Net</h2>
                {isMarketPriceLoading ? (
                  <Skeleton className="h-10 w-40" />
                ) : (
                  <TrendIndicator number={TotalNet} className="text-3xl" />
                )}
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <SwiperComponent
              slidesPerView={isCategoriesLessThanThree ? 2 : 3}
              centeredSlides
              loop
              initialSlide={selectedIndex}
              className={twMerge(
                isMobile || windowWidth < 1280 || windowWidth < 900
                  ? "mask"
                  : "",
                isCategoriesLessThanThree ? "max-w-screen-md mask" : ""
              )}
              onSlideChange={(swiper) => {
                const newSelectedIndex = swiper.realIndex;
                setSelectedIndex(newSelectedIndex);
                setProductCategory(categoriesArray[newSelectedIndex].slug);
              }}
              breakpoints={{
                768: { slidesPerView: 2 },
                900: { slidesPerView: isCategoriesLessThanThree ? 2 : 3 },
                1024: {
                  slidesPerView: 2,
                },
                1280: {
                  slidesPerView: isCategoriesLessThanThree ? 2 : 3,
                },
              }}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              {categoriesArray.map((category, index) => (
                <SwiperSlide key={index} className="my-auto">
                  <div
                    className={twMerge(
                      "capitalize cursor-pointer mx-1 text-center text-sm p-3 block md:hidden rounded-md transition-all shadow-inner duration-300",
                      selectedIndex === index
                        ? "font-bold bg-primary-blue-100 text-primary"
                        : "bg-accent"
                    )}
                    onClick={() => {
                      setSelectedIndex(index);
                      setProductCategory(category.slug);
                      swiperRef.current?.slideToLoop(index);
                      setCurrentPage(1);
                    }}
                  >
                    {category.name}
                  </div>
                  <CategoryCard
                    category={category}
                    portfolioProducts={portfolioProducts}
                    className={twMerge(
                      "p-6 mx-3 hidden rounded-2xl md:flex flex-col justify-between min-h-60 cursor-pointer bg-accent transition-all shadow-inner duration-500",
                      selectedIndex === index
                        ? "h-80 bg-primary-blue-30"
                        : "bg-accent"
                    )}
                    onClick={() => {
                      setSelectedIndex(index);
                      setProductCategory(category.slug);
                      swiperRef.current?.slideToLoop(index);
                      setCurrentPage(1);
                    }}
                    boughtProducts={boughtProducts}
                    isLoading={isMarketPriceLoading}
                    isSelected={selectedIndex === index}
                  />
                </SwiperSlide>
              ))}
            </SwiperComponent>

            {selectedCategory && (
              <CategoryCard
                category={selectedCategory}
                portfolioProducts={portfolioProducts}
                boughtProducts={boughtProducts}
                className={twMerge(
                  "p-6 my-4 flex rounded-2xl md:hidden flex-col justify-between h-80 min-h-60 bg-primary-blue-30"
                )}
                isSelected
                isLoading={isMarketPriceLoading}
              />
            )}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-4 gap-y-8 lg:gap-4">
        <div className="mx-auto lg:order-1 order-last">
          <div className="relative dropdown">
            <Button
              variant="outline"
              className="w-80 text-base !h-12 shadow-md flex justify-between"
              ref={triggerRef}
              onClick={(e) => {
                handleDropdownToggle(e);
                handleTriggerClick(e);
              }}
            >
              {selectedStatus}
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <IoIosArrowDown />
              </motion.div>
            </Button>
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute z-10 w-80 bg-primary shadow-lg rounded-md mt-1 p-1 space-y-1"
                >
                  {Object.values(InvestmentStatus).map((status) => (
                    <div
                      key={status}
                      className={twMerge(
                        "text-base p-3 cursor-pointer hover:bg-accent rounded-md",
                        status === selectedStatus
                          ? "bg-primary-blue-100 text-primary hover:bg-primary-blue-100"
                          : ""
                      )}
                      onClick={() => handleOptionSelect(status)}
                    >
                      {status}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="w-full col-span-2 hidden md:flex justify-center items-center gap-20 lg:order-2 order-1">
          <Button
            variant="transparent"
            className="!p-2 rounded-full hover:bg-accent shadow-md"
            onClick={handlePrev}
          >
            <IoIosArrowBack />
          </Button>
          <Button
            variant="transparent"
            className="!p-2 rounded-full hover:bg-accent shadow-md"
            onClick={handleNext}
          >
            <IoIosArrowForward />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
