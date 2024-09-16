import { TradingViewTickerProps } from "@/lib/types/trading-view";
import { useEffect } from "react";

const TradingViewTicker: React.FC<TradingViewTickerProps> = ({ symbols }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;

    script.innerHTML = JSON.stringify({
      symbols: symbols,
      showSymbolLogo: true,
      isTransparent: false,
      displayMode: "adaptive",
      colorTheme: "light",
      locale: "in",
    });

    const container = document.getElementById("tradingview-widget-container");
    if (container) {
      container.appendChild(script);
    }

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [symbols]);

  return (
    <div className="mask md:mask-xl">
      <div id="tradingview-widget-container">
        <div className="tradingview-widget-container__widget bg-transparent"></div>
      </div>
    </div>
  );
};

export default TradingViewTicker;
