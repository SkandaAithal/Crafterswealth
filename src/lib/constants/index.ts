import { PiArticleMediumLight } from "react-icons/pi";
import {
  ABOUT_US,
  ARTICLES,
  CONTACT,
  HOME,
  PRIVACY_POLICY,
  PRODUCTS,
  TERMS_AND_CONDITION,
} from "../routes";
import { CiWallet } from "react-icons/ci";
import { InvestmentType, TimePeriod } from "../types/stocks-chart";

export const HEADER_ROUTES = [
  { name: "Home", route: HOME },
  {
    name: "Opportunity Dashboard",
    route: "#",
    subroutes: [
      { name: "My Portfolio", route: PRODUCTS, icon: CiWallet },
      { name: "Expert Articles", route: ARTICLES, icon: PiArticleMediumLight },
    ],
  },
  { name: "Our Story", route: ABOUT_US },
  { name: "Contact Us", route: CONTACT },
];

export const FOOTER_ROUTES = [
  { name: "Home", route: HOME },
  { name: "Privacy Policy", route: PRIVACY_POLICY },
  { name: "Terms and Conditions", route: TERMS_AND_CONDITION },
  { name: "About Us", route: ABOUT_US },
  { name: "Contact Us", route: CONTACT },
];

export const PRODUCTS_CAROUSEL_ITEMS = [
  {
    id: 1,
    heading: "Small Cap Targets",
    link: PRODUCTS,
    description:
      "Find the right buy prices and projected target hits for high-growth small cap stocks. Perfect for aggressive investors seeking detailed buy recommendations.",
  },
  {
    id: 2,
    heading: "Mid Cap Insights",
    link: PRODUCTS,
    description:
      "Get buy recommendations and target timelines for stable mid cap stocks. Ideal for investors seeking a balance between growth and security.",
  },
  {
    id: 3,
    heading: "Large Cap Signals",
    link: PRODUCTS,
    description:
      "Access precise buy prices and target forecasts for large cap stocks with consistent returns. Best for long-term investors looking for solid growth.",
  },
  {
    id: 4,
    heading: "Market Blogs",
    link: ARTICLES,
    description:
      "Stay updated on the latest trends, strategies, and insights to help you make informed investment decisions.",
  },
];

export const TARGETS_REACHED_ITEMS = [
  {
    id: 1,
    stock: "GrindWell (RP0017)",
    sell: 2609.9,
    buy: 2282.0,
    period: "28 days",
  },
  {
    id: 2,
    stock: "Tata Motors (TTM001)",
    sell: 510.5,
    buy: 460.0,
    period: "15 days",
  },
  {
    id: 3,
    stock: "Reliance Industries (RELI021)",
    sell: 2625.7,
    buy: 2400.5,
    period: "30 days",
  },
  {
    id: 4,
    stock: "Infosys (INFY007)",
    sell: 1599.2,
    buy: 1480.0,
    period: "21 days",
  },
  {
    id: 5,
    stock: "HDFC Bank (HDFC010)",
    sell: 1509.8,
    buy: 1390.3,
    period: "25 days",
  },
  {
    id: 6,
    stock: "Bharti Airtel (BHA005)",
    sell: 820.6,
    buy: 780.0,
    period: "18 days",
  },
  {
    id: 7,
    stock: "ICICI Bank (ICIC011)",
    sell: 950.3,
    buy: 910.0,
    period: "20 days",
  },
  {
    id: 8,
    stock: "Larsen & Toubro (LART002)",
    sell: 1875.5,
    buy: 1750.3,
    period: "26 days",
  },
  {
    id: 9,
    stock: "Asian Paints (ASP003)",
    sell: 3200.0,
    buy: 3000.5,
    period: "14 days",
  },
  {
    id: 10,
    stock: "Axis Bank (AXIS008)",
    sell: 850.4,
    buy: 810.0,
    period: "19 days",
  },
  {
    id: 11,
    stock: "Wipro (WIP001)",
    sell: 430.2,
    buy: 400.0,
    period: "22 days",
  },
  {
    id: 12,
    stock: "Tech Mahindra (TECH002)",
    sell: 1045.7,
    buy: 990.3,
    period: "27 days",
  },
  {
    id: 13,
    stock: "Adani Ports (ADAN003)",
    sell: 740.8,
    buy: 700.1,
    period: "17 days",
  },
  {
    id: 14,
    stock: "SBI (SBI012)",
    sell: 625.0,
    buy: 580.0,
    period: "24 days",
  },
  {
    id: 15,
    stock: "Coal India (COAL013)",
    sell: 225.3,
    buy: 210.0,
    period: "16 days",
  },
  {
    id: 16,
    stock: "Maruti Suzuki (MAR014)",
    sell: 8750.5,
    buy: 8400.0,
    period: "29 days",
  },
  {
    id: 17,
    stock: "Power Grid (PWR015)",
    sell: 220.5,
    buy: 200.0,
    period: "13 days",
  },
  {
    id: 18,
    stock: "Tata Steel (TSTL016)",
    sell: 1215.9,
    buy: 1150.0,
    period: "30 days",
  },
  {
    id: 19,
    stock: "Hindustan Unilever (HUL017)",
    sell: 2700.2,
    buy: 2550.0,
    period: "22 days",
  },
  {
    id: 20,
    stock: "Ultratech Cement (ULT018)",
    sell: 6850.6,
    buy: 6500.5,
    period: "25 days",
  },
  {
    id: 21,
    stock: "JSW Steel (JSW019)",
    sell: 725.0,
    buy: 680.0,
    period: "19 days",
  },
  {
    id: 22,
    stock: "HCL Technologies (HCL020)",
    sell: 1250.7,
    buy: 1180.0,
    period: "27 days",
  },
  {
    id: 23,
    stock: "Zomato (ZOM021)",
    sell: 120.0,
    buy: 100.5,
    period: "18 days",
  },
  {
    id: 24,
    stock: "Paytm (PAY022)",
    sell: 860.4,
    buy: 800.0,
    period: "23 days",
  },
  {
    id: 25,
    stock: "M&M (MAM023)",
    sell: 1545.9,
    buy: 1480.0,
    period: "26 days",
  },
  {
    id: 26,
    stock: "Bajaj Auto (BAJ024)",
    sell: 4250.7,
    buy: 4100.3,
    period: "20 days",
  },
];

export const barChartGraphData = {
  [TimePeriod.OneMonth]: {
    [InvestmentType.Crafterswealth]: 0.105,
    [InvestmentType.Nifty50]: 0.04,
    [InvestmentType.MutualFund]: 0.037,
  },
  [TimePeriod.ThreeMonths]: {
    [InvestmentType.Crafterswealth]: 0.3,
    [InvestmentType.Nifty50]: 0.08,
    [InvestmentType.MutualFund]: 0.12,
  },
  [TimePeriod.SixMonths]: {
    [InvestmentType.Crafterswealth]: 0.55,
    [InvestmentType.Nifty50]: 0.12,
    [InvestmentType.MutualFund]: 0.25,
  },
};

export const MUST_BUY_CARDS_DATA = [
  {
    title: "Business Analysis",
    text: "Gain insights into the company’s core operations, market positioning, and growth strategies.",
  },
  {
    title: "Financial Analysis",
    text: "Explore the company’s financial health, performance metrics, and key financial indicators.",
  },
  {
    title: "Technical Analysis",
    text: "Uncover technical insights and market trends impacting the company’s stock price.",
  },
  {
    title: "Pointers",
    text: "Receive actionable recommendations with precise entry and exit points. Summarised key findings for the highlighted stock.",
  },
];

export const FAQ_DATA = [
  {
    question: "What makes CraftersWealth’s research papers different?",
    answer:
      "CraftersWealth gives you clear instructions on what stocks to buy, when to buy, and when to sell. Our research papers are packed with detailed analysis and target dates for maximum profit.",
  },
  {
    question: "How can I access CraftersWealth’s research papers?",
    answer:
      "It’s easy! Just click on the Access Now button down below. Each paper is packed with valuable insights, including buy and target prices, analysis, and target dates. You’ll have instant access to actionable investment opportunities",
  },
  {
    question: "Is CraftersWealth suitable for beginners in the stock market?",
    answer:
      "Absolutely! CraftersWealth caters to investors of all levels, including beginners. Our research papers are designed to be clear and easy to understand, making them perfect for those new to investing. With our precise recommendations and detailed analysis, beginners can confidently start their investment journey with CraftersWealth’s guidance.",
  },
];

export const INDIAN_STOCKS = [
  "RELIANCE",
  "TCS",
  "HDFCBANK",
  "INFY",
  "HUL",
  "ICICIBANK",
  "SBI",
  "BHARTIARTL",
  "HDFC",
  "KOTAKBANK",
  "LT",
  "AXISBANK",
  "ITC",
  "BAJAJFINANCE",
  "WIPRO",
  "TATAMOTORS",
  "MARUTI",
  "SUNPHARMA",
  "DRREDDY",
  "NTPC",
  "ONGC",
  "POWERGRID",
  "MAHINDRA",
  "SBILIFE",
  "UPL",
  "TECHM",
  "EICHERMOT",
  "ADANIENT",
  "ADANIGREEN",
  "JSWSTEEL",
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Rajesh Patel",
    title: "Software Engineer",
    testimonial:
      "Impressive insights! Their research papers are a game-changer in the stock market arena. A must-have for any serious investor!",
  },
  {
    id: 2,
    name: "Rahul Kapoor",
    title: "Financial Analyst",
    testimonial:
      "Incredible attention to detail! Their research papers provide invaluable guidance, helping me make informed investment decisions.",
  },
  {
    id: 3,
    name: "Shreya balaji",
    title: "Architect",
    testimonial:
      "A true asset to the investment community! Their research papers are a goldmine of valuable information, offering unparalleled insights into market trends.",
  },
  {
    id: 4,
    name: "Priya sharma",
    title: "Doctor",
    testimonial:
      "Trustworthy and reliable! Their expertise in market analysis shines through in every paper they produce. Highly recommended for anyone navigating the stock market.",
  },
];

export const SYMBOLS_DATA = [
  { proName: "BSE:SENSEX", title: "SENSEX" },
  { proName: "BSE:RELIANCE", title: "Reliance Industries" },
  { proName: "BSE:TCS", title: "Tata Consultancy Services" },
  { proName: "BSE:HDFCBANK", title: "HDFC Bank" },
  { proName: "BSE:INFY", title: "Infosys" },
  { proName: "BSE:BAJFINANCE", title: "Bajaj Finance" },
  { proName: "BSE:ITC", title: "ITC Limited" },
  { proName: "BSE:SBIN", title: "State Bank of India" },
  { proName: "BSE:LT", title: "Larsen & Toubro" },
];

export const MY_PRODUCTS = [
  {
    id: 1,
    productName: "Small cap stocks",
    slug: "smallCap",
    target: "15.3%",
    paper: "RP0019",
    description:
      "Small cap stocks are shares of companies with a relatively small market capitalization, typically offering higher growth potential but with greater risk.",
  },
  {
    id: 2,
    productName: "Mid cap stocks",
    target: "20.3%",
    slug: "midCap",

    paper: "RP0014",
    description:
      "Mid cap stocks are shares of companies with a medium market capitalization, offering a balance of growth potential and stability compared to small and large cap stocks.",
  },
  {
    id: 3,
    productName: "Large cap stocks",
    target: "23.7%",
    slug: "largeCap",
    paper: "RP0013",
    description:
      "Large cap stocks are shares of well-established companies with a large market capitalization, known for stability and consistent returns but typically offering slower growth.",
  },
];

export const STANDARD_PLAN_DATA = [
  {
    title: "Regular Plan",
    price: 99,
    description: "Access to a research paper and 10 archive papers.",
    validFor: "Lifetime",
    buttonText: "Buy Now",
    benefits: ["Access to the research paper", "10 archive research papers"],
  },
  {
    title: "1-Month Access Plan",
    price: 300,
    description:
      "Full access to research papers and free new releases for 1 month.",
    validFor: "1 month",
    buttonText: "Subscribe Now",
    benefits: [
      "Access to the research paper",
      "10 archive research papers",
      "Free access to all new research papers for 1 month",
    ],
  },
];

export const PREMIUM_PLAN_DATA = [
  {
    title: "Quarterly Access Plan",
    price: 800,
    description:
      "Full access to research papers and free new releases for 3 months.",
    validFor: "3 months",
    buttonText: "Subscribe Now",
    benefits: [
      "Access to all research papers",
      "10 archive research papers",
      "Free access to all new research papers for 3 months",
    ],
  },
  {
    title: "Half-Year Access Plan",
    price: 1500,
    description:
      "Full access to research papers and free new releases for 6 months.",
    validFor: "6 months",
    buttonText: "Subscribe Now",
    benefits: [
      "Access to all research papers",
      "10 archive research papers",
      "Free access to all new research papers for 6 months",
    ],
  },
  {
    title: "Annual Access Plan",
    price: 2800,
    description:
      "Full access to research papers and free new releases for 12 months.",
    validFor: "12 months",
    buttonText: "Subscribe Now",
    benefits: [
      "Access to all research papers",
      "10 archive research papers",
      "Free access to all new research papers for 12 months",
    ],
  },
];

export const STOCK_RESEARCH_CONFIG = {
  smallCap: {
    title: "Small Cap Stock Research",
    type: "Small Cap Stock",
    aboutStock:
      "Small cap stocks represent companies with smaller market capitalization, typically ranging from ₹100 crore to ₹5,000 crore. These stocks are more volatile but have greater potential for substantial growth, often outperforming larger stocks during bull markets.",

    whyReliable: [
      "Our research team specializes in identifying under-the-radar small cap stocks with high growth potential.",
      "We provide in-depth technical and fundamental analysis, including insider buying patterns and institutional interest.",
      "Our reports are data-driven, with real-time market insights to give you a competitive advantage.",
    ],

    marketSentiment:
      "Small cap stocks tend to perform well during periods of economic expansion but can be more vulnerable to market corrections and downturns. However, strategic investments can yield higher returns if timed well.",

    reasonToBuy: [
      "Higher growth potential compared to large cap stocks.",
      "Opportunity to invest in companies in their early growth stages.",
      "Small cap stocks can generate substantial returns over time.",
      "Diversification into emerging industries and technologies.",
    ],

    investorProfile: [
      "Aggressive investors looking for high growth potential.",
      "Investors who are willing to tolerate higher volatility.",
      "People interested in long-term growth and diversification.",
    ],
  },

  midCap: {
    title: "Mid Cap Stock Research",
    type: "Mid Cap Stock",

    aboutStock:
      "Mid cap stocks represent companies with a market capitalization between ₹5,000 crore and ₹20,000 crore. These companies offer a balance between growth potential and stability, often considered a 'sweet spot' for risk and reward in the stock market.",

    whyReliable: [
      "We focus on stable mid cap companies with proven track records, yet untapped potential for significant growth.",
      "Our research incorporates comprehensive sectoral analysis and peer comparisons to offer actionable insights.",
      "We have access to proprietary data and predictive models to help guide investment decisions.",
    ],

    marketSentiment:
      "Mid cap stocks generally perform well during stable economic periods. They are often more resilient than small caps during downturns and can benefit from mergers, acquisitions, and industry growth.",

    reasonToBuy: [
      "Balanced risk and return compared to small and large caps.",
      "Companies with solid growth potential but lower risk than small caps.",
      "Mid caps often outperform during periods of economic expansion.",
      "Opportunity to invest in companies poised to become large caps.",
    ],

    investorProfile: [
      "Moderate-risk investors seeking a balance between stability and growth.",
      "People looking for companies with both growth potential and proven stability.",
      "Investors interested in well-established sectors like manufacturing, retail, and healthcare.",
    ],
  },

  largeCap: {
    title: "Large Cap Stock Research",
    type: "Large Cap Stock",

    aboutStock:
      "Large cap stocks are shares of companies with a market capitalization above ₹20,000 crore. These companies are typically well-established, financially stable, and provide a lower-risk investment option.",

    whyReliable: [
      "Our large cap research includes detailed macroeconomic analysis to provide context for market movements and trends.",
      "We monitor global market conditions, industry shifts, and company fundamentals to create actionable recommendations.",
      "Our papers focus on long-term strategies, dividend yields, and potential for steady growth.",
    ],

    marketSentiment:
      "Large cap stocks are considered safer investments and are often favored during periods of economic uncertainty or volatility. They tend to provide steady returns through dividends and moderate price appreciation.",

    reasonToBuy: [
      "Lower risk due to company size and financial stability.",
      "Consistent dividends and reliable long-term growth.",
      "Less volatile, making them a safer choice during market downturns.",
      "Often the foundation of long-term portfolios with a focus on wealth preservation.",
    ],

    investorProfile: [
      "Conservative investors focused on stability and long-term growth.",
      "Dividend-focused investors looking for steady income.",
      "People seeking lower volatility and safer returns.",
    ],
  },
};

export const BLOGS_DATA = [
  {
    id: 1,
    title: "Understanding the Stock Market",
    description:
      "The stock market is a complex and dynamic system that involves buying and selling shares of publicly traded companies.",
    image: "/product-details.avif",
  },
  {
    id: 2,
    title: "How to Invest in Small Cap Stocks",
    description:
      "Small cap stocks offer great growth potential, but they come with higher risks. Learn how to invest wisely in small cap companies.",
    image: "/product-details.avif",
  },
  {
    id: 3,
    title: "The Importance of Diversification",
    description:
      "Diversifying your investment portfolio is key to reducing risk and achieving long-term financial goals.",
    image: "/product-details.avif",
  },
  {
    id: 4,
    title: "Mid Cap Stocks: A Balanced Investment",
    description:
      "Mid cap stocks provide a good balance between the high risk of small caps and the stability of large caps.",
    image: "/product-details.avif",
  },
  {
    id: 5,
    title: "Analyzing Large Cap Stocks",
    description:
      "Large cap stocks are known for their stability and solid returns. Discover how to analyze and invest in them.",
    image: "/product-details.avif",
  },
  {
    id: 6,
    title: "Top Strategies for Stock Market Beginners",
    description:
      "If you're new to the stock market, learn some top strategies to help you start your investment journey with confidence.",
    image: "/product-details.avif",
  },
  {
    id: 7,
    title: "How to Time the Market: Is It Possible?",
    description:
      "Timing the market can be risky, but some strategies may help you make the most of market fluctuations.",
    image: "/product-details.avif",
  },
  {
    id: 8,
    title: "The Role of Dividends in Your Portfolio",
    description:
      "Dividends can provide a steady income stream. Learn how to include dividend-paying stocks in your investment portfolio.",
    image: "/product-details.avif",
  },
  {
    id: 9,
    title: "Why Market Volatility is an Opportunity",
    description:
      "Market volatility can cause uncertainty, but it also presents opportunities for smart investors to buy low and sell high.",
    image: "/product-details.avif",
  },
  {
    id: 10,
    title: "Understanding Stock Buybacks",
    description:
      "Stock buybacks can influence a company's stock price. Discover how they work and how they can affect your investments.",
    image: "/product-details.avif",
  },
  {
    id: 11,
    title: "The Difference Between Growth and Value Stocks",
    description:
      "Growth and value stocks are two different investment approaches. Learn the difference and which may be right for you.",
    image: "/product-details.avif",
  },
  {
    id: 12,
    title: "Impact of Interest Rates on Stock Markets",
    description:
      "Interest rates can significantly influence the stock market. Explore how rate changes impact stock prices.",
    image: "/product-details.avif",
  },
  {
    id: 13,
    title: "Top Sectors to Watch in 2024",
    description:
      "Certain sectors are expected to perform well in 2024. Discover which industries might offer the best opportunities.",
    image: "/product-details.avif",
  },
  {
    id: 14,
    title: "What to Know About Stock Splits",
    description:
      "Stock splits don't change a company's value, but they can affect the number of shares you own. Learn more about stock splits.",
    image: "/product-details.avif",
  },
  {
    id: 15,
    title: "Psychology of Stock Trading: Keeping Your Emotions in Check",
    description:
      "Trading stocks is as much about psychology as it is about strategy. Learn how to manage emotions when making trades.",
    image: "/product-details.avif",
  },
];
