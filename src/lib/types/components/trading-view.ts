export interface StockSymbol {
  proName: string;
  title: string;
}

export interface TradingViewTickerProps {
  symbols: StockSymbol[];
}
