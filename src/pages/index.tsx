import AnimateOnce from "@/components/common/AnimateOnce";
import Scroller from "@/components/common/Scroller";
import Title from "@/components/common/Title";
import Typewriter from "@/components/common/TypeWriter";
import FAQ from "@/components/home-page/Faq";
import Testimonials from "@/components/home-page/Testimonials";
import TradingViewTicker from "@/components/home-page/TradingViewTicker";
import ProductsSwiper from "@/components/products/ProductsSwiper";
import StocksBarChart from "@/components/products/StocksBarChart";
import TargetsReached from "@/components/products/TargetsReached";
import { Button } from "@/components/ui/button";
import {
  INDIAN_STOCKS,
  MUST_BUY_CARDS_DATA,
  SYMBOLS_DATA,
} from "@/lib/constants";
import { PRODUCTS } from "@/lib/routes";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleredirectToProductsPage = () => router.push(PRODUCTS);

  return (
    <main>
      <section className="banner h-[90dvh] py-20 px-4 w-full grid place-content-center text-center">
        <Title text="Investment Made Easy with" />
        <h1 className="text-3xl md:text-5xl lg:text-6xl mb-4 text-transparent bg-clip-text bg-gradient-to-b from-[#0C1B6C] via-[#2C3E98] to-[#384EC2] font-normal">
          <span className="font-[1000]">Crafters</span>Wealth
        </h1>
        <div className="grid place-content-center">
          <Typewriter
            text="Get daily insights from our research papers on which stocks to buy and when to sell!"
            className="font-semibold text-sm lg:text-xl h-10"
          />
        </div>

        <Button
          onClick={handleredirectToProductsPage}
          className="w-fit mx-auto mt-5 text-2xl font-bold !px-20 md:!py-4"
        >
          Buy Now
        </Button>
      </section>
      <TradingViewTicker symbols={SYMBOLS_DATA} />

      <section className="max-w-screen-xl text-center mx-auto py-20 space-y-12 ">
        <Title text="Our Products" className="" />
        <ProductsSwiper />
        <div className="grid gap-6">
          <TargetsReached />
        </div>
      </section>
      <section className="bg-accent layout flex flex-col md:flex-row justify-center gap-14 items-center">
        <div>
          <AnimateOnce>
            <Title text="Today’s Must Buy Report" size="H2" />
            <p className="">
              Dive into our daily research papers for a new investment
              opportunity each day! These papers provide detailed insights into
              which stocks to buy, at what price to buy, and when to sell,
              maximizing your potential gains.
            </p>
          </AnimateOnce>
          <AnimateOnce>
            <div className="grid lg:grid-cols-2 gap-6 my-6 cursor-default">
              {MUST_BUY_CARDS_DATA.map(({ text, title }) => (
                <div
                  className="bg-primary rounded-lg p-4 shadow-lg"
                  key={title}
                >
                  <h3 className="text-black font-bold mb-4 text-xl">{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
            <Button
              onClick={handleredirectToProductsPage}
              variant="ghost"
              className="w-fit mx-auto"
            >
              Access Now
            </Button>
          </AnimateOnce>
        </div>
        <StocksBarChart />
      </section>
      <div className="bg-accent layout">
        <Scroller>
          {INDIAN_STOCKS.map((stock) => (
            <div
              className="m-2 px-2 text-base py-1 border border-gray-500 rounded-lg"
              key={stock}
            >
              {stock}
            </div>
          ))}
        </Scroller>
      </div>

      <section className="bg-gradient-to-b from-accent to-white layout pb-16 space-y-10">
        <AnimateOnce>
          <FAQ />
        </AnimateOnce>
        <AnimateOnce>
          <Testimonials />
        </AnimateOnce>
      </section>
    </main>
  );
}
