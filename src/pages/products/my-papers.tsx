import Title from "@/components/common/Title";
import TradingViewTicker from "@/components/home-page/TradingViewTicker";
import MyPapersParentComponent from "@/components/my-papers/MyPapersParentComponent";
import { SYMBOLS_DATA } from "@/lib/constants";

const MyPapers = () => {
  return (
    <main>
      <section className="layout banner-2 pb-10">
        <Title text="My portfolio" className="text-center md:text-left" />
      </section>
      <section className="h-16">
        <TradingViewTicker symbols={SYMBOLS_DATA} />
      </section>
      <section className="min-h-screen pb-14 !pt-10 md:pt-6">
        <MyPapersParentComponent />
      </section>
    </main>
  );
};

export default MyPapers;
