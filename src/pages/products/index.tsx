import AnimateOnce from "@/components/common/AnimateOnce";
import Title from "@/components/common/Title";
import Typewriter from "@/components/common/TypeWriter";
import StocksBarChart from "@/components/products/StocksBarChart";
import TargetsReached from "@/components/products/TargetsReached";
import { Button } from "@/components/ui/button";
import { MY_PRODUCTS } from "@/lib/constants";
import { PLAN, PRODUCTS_DETAIL } from "@/lib/routes";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoTriangle } from "react-icons/io5";

const Products = () => {
  const router = useRouter();

  const handleBuyNowClick = () => {
    router.push(PLAN);
  };

  const handleReadMoreClick = (slug: string) => {
    router.push(`${PRODUCTS_DETAIL}/?id=${slug}`);
  };
  const renderProducts = () => (
    <section className="layout grid md:grid-cols-3 gap-16">
      {MY_PRODUCTS.map((item) => (
        <AnimateOnce key={item.id}>
          <div className="text-center relative space-y-4 bg-accent rounded-lg shadow-lg p-8 ">
            <Image
              className="mx-auto absolute -top-12"
              src={"/test.avif"}
              alt="test"
              height={100}
              width={100}
            />
            <h1 className="font-bold text-2xl">{item.productName}</h1>
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">
                Reasearch paper {item.paper}
              </h2>
              <div className="space-y-3">
                <p>Potential left </p>
                <p className="text-3xl flex justify-center items-center gap-1 text-green-400 font-semibold">
                  <IoTriangle size={20} />
                  {item.target}
                </p>

                <Button
                  variant={"secondary"}
                  size={"lg"}
                  onClick={handleBuyNowClick}
                  className="shadow rounded-full"
                >
                  Buy Now
                </Button>
              </div>
            </div>
            <div className="text-base">
              <p className="line-clamp-3">{item.description}</p>
              <span
                onClick={() => handleReadMoreClick(item.slug)}
                className="cursor-pointer text-primary-blue font-semibold flex gap-1 items-center justify-center"
              >
                Read more <FaArrowRightLong />
              </span>
            </div>
          </div>
        </AnimateOnce>
      ))}
    </section>
  );

  return (
    <main>
      <section className="text-center banner-2 md:text-start grid md:grid-cols-2 layout pb-16">
        <div className="h-48">
          <Title text="Your Opportunities" />
          <Typewriter text="Our expert analysis combines technical prowess and fundamental insights for your financial success. Join us and seize lucrative opportunities in the stock market today." />
        </div>
      </section>
      {renderProducts()}
      <section className="bg-gradient-to-t from-accent to-white flex flex-col md:flex-row gap-10 justify-between layout items-center pb-16">
        <div className="space-y-10">
          <div className="">
            <Title text="Our Proven Success" size="H2" />
            <p className="max-w-screen-sm">
              Backed by years of experience and a team of seasoned analysts,
              CraftersWealth boasts of an impressive 96% success rate.
            </p>
          </div>
          <TargetsReached onlyTargets />
        </div>
        <StocksBarChart />
      </section>
    </main>
  );
};

export default Products;
