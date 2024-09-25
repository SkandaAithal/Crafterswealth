import Title from "@/components/common/Title";
import TradingViewTicker from "@/components/home-page/TradingViewTicker";
import MyPapersCard from "@/components/products/MyPapersCard";
import { Separator } from "@/components/ui/separator";
import { PAPERS, SYMBOLS_DATA } from "@/lib/constants";
import useStockData from "@/lib/hooks/use-stock-data";
import { useMemo } from "react";

const MyPapers = () => {
  const SYMBOLS = useMemo(() => PAPERS.map((paper) => paper.stockSymbol), []);
  const { stockData, loading } = useStockData(SYMBOLS);
  const latestPaper = PAPERS[0];
  const latestPaperMarketPrice =
    stockData.find((data) => data.symbol === latestPaper.stockSymbol)?.price ??
    0;
  const otherPapers = PAPERS.slice(1);
  return (
    <main>
      <section className="layout banner-2 pb-10">
        <Title text="Your portfolio" className="text-center md:text-left" />
      </section>
      <TradingViewTicker symbols={SYMBOLS_DATA} />
      <section className="min-h-screen layout !py-10 space-y-10">
        <Title
          text="Your Latest paper"
          size="H2"
          className="text-center md:text-left"
        />
        <MyPapersCard
          isLoading={loading}
          marketPrice={latestPaperMarketPrice}
          {...latestPaper}
        />

        <Separator />

        <div className="flex justify-between gap-6 flex-wrap">
          {otherPapers.map((paper) => {
            const marketPrice =
              stockData.find((data) => data.symbol === paper.stockSymbol)
                ?.price ?? 0;
            return (
              <MyPapersCard
                key={paper.id}
                isLoading={loading}
                marketPrice={marketPrice}
                {...paper}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default MyPapers;
