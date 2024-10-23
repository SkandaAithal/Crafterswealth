import { PiArticleMediumLight } from "react-icons/pi";
import {
  ABOUT_US,
  ARTICLES,
  CONTACT,
  HOME,
  MY_PAPERS,
  PRIVACY_POLICY,
  PRODUCTS,
  TERMS_AND_CONDITION,
} from "../routes";
import { CiWallet } from "react-icons/ci";
import { InvestmentType, TimePeriod } from "../types/components/stocks-chart";

export const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY!;
export const GEO_NAMES_USER_NAME = process.env.NEXT_PUBLIC_GEO_NAME_USER_NAME!;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
export const APP_INFO = "app-info";
export const USER_INFO = "user-info";

export const HEADER_ROUTES = [
  { name: "Home", route: HOME },
  { name: "Opportunity Dashboard", route: PRODUCTS },

  {
    name: "Resources",
    route: "#",
    subroutes: [
      { name: "My Portfolio", route: MY_PAPERS, icon: CiWallet },
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

export const ICONS = [
  "/icons/icon-1.png",
  "/icons/icon-2.png",
  "/icons/icon-3.png",
  "/icons/icon-4.png",
];

export const PRODUCTS_CAROUSEL_ITEMS = [
  {
    id: 1,
    heading: "Small Cap Targets",
    link: PRODUCTS,
    description:
      "Find the right buy prices and projected target hits for high-growth small cap stocks. Perfect for aggressive investors seeking detailed buy recommendations.",
    imgUrl: "/icons/icon-2.png",
  },
  {
    id: 2,
    heading: "Mid Cap Insights",
    link: PRODUCTS,
    description:
      "Get buy recommendations and target timelines for stable mid cap stocks. Ideal for investors seeking a balance between growth and security.",
    imgUrl: "/icons/icon-3.png",
  },
  {
    id: 3,
    heading: "Large Cap Signals",
    link: PRODUCTS,
    description:
      "Access precise buy prices and target forecasts for large cap stocks with consistent returns. Best for long-term investors looking for solid growth.",
    imgUrl: "/icons/icon-4.png",
  },
  {
    id: 4,
    heading: "Market Blogs",
    link: ARTICLES,
    description:
      "Stay updated on the latest trends, strategies, and insights to help you make informed investment decisions.",
    imgUrl: "/icons/icon-1.png",
  },
];

export const TARGETS_REACHED_ITEMS = [
  {
    id: 1,
    stock: "GrindWell (RP0017)",
    sell: 2609.9,
    buy: 2282.0,
    period: "28 days",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
  },
  {
    id: 2,
    stock: "Tata Motors (TTM001)",
    sell: 510.5,
    buy: 460.0,
    period: "15 days",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
  },
  {
    id: 3,
    stock: "Reliance Industries (RELI021)",
    sell: 2625.7,
    buy: 2400.5,
    period: "30 days",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
  },
  {
    id: 4,
    stock: "Infosys (INFY007)",
    sell: 1599.2,
    buy: 1480.0,
    period: "21 days",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
  },
  {
    id: 5,
    stock: "HDFC Bank (HDFC010)",
    sell: 1509.8,
    buy: 1390.3,
    period: "25 days",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
  },
  {
    id: 6,
    stock: "Bharti Airtel (BHA005)",
    sell: 820.6,
    buy: 780.0,
    period: "18 days",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
  },
  {
    id: 7,
    stock: "ICICI Bank (ICIC011)",
    sell: 950.3,
    buy: 910.0,
    period: "20 days",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
  },
  {
    id: 8,
    stock: "Larsen & Toubro (LART002)",
    sell: 1875.5,
    buy: 1750.3,
    period: "26 days",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
  },
  {
    id: 9,
    stock: "Asian Paints (ASP003)",
    sell: 3200.0,
    buy: 3000.5,
    period: "14 days",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
  },
  {
    id: 10,
    stock: "Axis Bank (AXIS008)",
    sell: 850.4,
    buy: 810.0,
    period: "19 days",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
  },
  {
    id: 11,
    stock: "Wipro (WIP001)",
    sell: 430.2,
    buy: 400.0,
    period: "22 days",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
  },
  {
    id: 12,
    stock: "Tech Mahindra (TECH002)",
    sell: 1045.7,
    buy: 990.3,
    period: "27 days",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
  },
  {
    id: 13,
    stock: "Adani Ports (ADAN003)",
    sell: 740.8,
    buy: 700.1,
    period: "17 days",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
  },
  {
    id: 14,
    stock: "SBI (SBI012)",
    sell: 625.0,
    buy: 580.0,
    period: "24 days",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
  },
  {
    id: 15,
    stock: "Coal India (COAL013)",
    sell: 225.3,
    buy: 210.0,
    period: "16 days",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
  },
  {
    id: 16,
    stock: "Maruti Suzuki (MAR014)",
    sell: 8750.5,
    buy: 8400.0,
    period: "29 days",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
  },
  {
    id: 17,
    stock: "Power Grid (PWR015)",
    sell: 220.5,
    buy: 200.0,
    period: "13 days",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
  },
  {
    id: 18,
    stock: "Tata Steel (TSTL016)",
    sell: 1215.9,
    buy: 1150.0,
    period: "30 days",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
  },
  {
    id: 19,
    stock: "Hindustan Unilever (HUL017)",
    sell: 2700.2,
    buy: 2550.0,
    period: "22 days",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
  },
  {
    id: 20,
    stock: "Ultratech Cement (ULT018)",
    sell: 6850.6,
    buy: 6500.5,
    period: "25 days",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
  },
  {
    id: 21,
    stock: "JSW Steel (JSW019)",
    sell: 725.0,
    buy: 680.0,
    period: "19 days",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
  },
  {
    id: 22,
    stock: "HCL Technologies (HCL020)",
    sell: 1250.7,
    buy: 1180.0,
    period: "27 days",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
  },
  {
    id: 23,
    stock: "Zomato (ZOM021)",
    sell: 120.0,
    buy: 100.5,
    period: "18 days",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
  },
  {
    id: 24,
    stock: "Paytm (PAY022)",
    sell: 860.4,
    buy: 800.0,
    period: "23 days",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
  },
  {
    id: 25,
    stock: "M&M (MAM023)",
    sell: 1545.9,
    buy: 1480.0,
    period: "26 days",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
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

export const FAQ_DATA = {
  pricing: [
    {
      question: "What makes CraftersWealth’s research papers different?",
      answer:
        "CraftersWealth gives you clear instructions on what stocks to buy, when to buy, and when to sell. Our research papers are packed with detailed analysis and target dates for maximum profit.",
    },
    {
      question: "How can I access CraftersWealth’s research papers?",
      answer:
        "It’s easy! Click on the 'Access Now' button on our site. Each paper includes actionable insights like buy/target prices, analysis, and target dates.",
    },
    {
      question: "Is CraftersWealth suitable for beginners in the stock market?",
      answer:
        "Absolutely! Our papers are designed for all experience levels, including beginners. They offer easy-to-follow recommendations and detailed insights.",
    },
    {
      question: "What payment methods do you accept for research papers?",
      answer:
        "We accept all major credit cards, debit cards, UPI, and other digital payment methods to ensure a secure and seamless transaction process.",
    },
    {
      question: "Is there any discount on bulk purchases of research papers?",
      answer:
        "Yes, we offer special discounts for bulk purchases. Contact our sales team for more information on discounts for institutional or multi-user licenses.",
    },
  ],
  features: [
    {
      question: "What are the key features of CraftersWealth research papers?",
      answer:
        "Our research papers offer in-depth stock analysis, expert recommendations, price targets, and predicted timelines for reaching investment goals.",
    },
    {
      question: "How often are new research papers published?",
      answer:
        "New research papers are published monthly, with insights on small cap, mid cap, and large cap stocks, covering multiple sectors.",
    },
    {
      question: "Do the research papers include risk analysis?",
      answer:
        "Yes, each research paper includes a detailed risk assessment to help you gauge the potential downsides before making an investment.",
    },
    {
      question: "Are the research papers updated if new market trends emerge?",
      answer:
        "We update our research papers as needed when significant market changes occur, ensuring that investors have the most current information.",
    },
    {
      question:
        "Can I receive notifications when new research papers are available?",
      answer:
        "Yes, you can sign up for our email alerts to get notified as soon as new research papers are published.",
    },
  ],
  support: [
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach us at support@crafterswealth.com or through our 24/7 live chat on the website for any questions or concerns.",
    },
    {
      question: "What is the average response time for support queries?",
      answer:
        "Our support team typically responds within 24 hours, but most queries are resolved much faster, especially through live chat.",
    },
    {
      question: "Can I get help with understanding the research papers?",
      answer:
        "Absolutely! Our support team can guide you through the details of our research papers if you need further clarification.",
    },
    {
      question: "Do you offer personalized investment advice?",
      answer:
        "While our research papers provide in-depth analysis, we do not offer personalized investment advice. For individual recommendations, consult a financial advisor.",
    },
    {
      question: "Is there any dedicated support for premium users?",
      answer:
        "Yes, premium users get priority support via email and chat, ensuring quicker resolution of any issues or queries.",
    },
  ],
  subscription: [
    {
      question: "What subscription plans do you offer?",
      answer:
        "We offer two plans: Basic for ₹99 (1 research paper + 10 archived papers) and Premium for ₹300 (access to all new papers for 1 month).",
    },
    {
      question: "Can I upgrade or downgrade my subscription plan?",
      answer:
        "Yes, you can easily switch between plans from your account dashboard. The changes will take effect immediately after confirmation.",
    },
    {
      question: "Is there a trial period for new users?",
      answer:
        "We do not offer a free trial, but our Basic plan for ₹99 allows you to explore our content at an affordable rate before upgrading to Premium.",
    },
    {
      question: "Will I be notified before my subscription renews?",
      answer:
        "Yes, you will receive a reminder email 3 days before your subscription is due to renew, giving you time to make any changes or cancellations.",
    },
    {
      question: "Can I cancel my subscription at any time?",
      answer:
        "Yes, you can cancel your subscription anytime from your account dashboard. Your access will continue until the end of the billing period.",
    },
  ],
  security: [
    {
      question: "How secure is my payment information?",
      answer:
        "We use advanced encryption protocols to secure all payment transactions. Your data is protected by industry-standard security measures.",
    },
    {
      question: "Does CraftersWealth store my payment details?",
      answer:
        "No, we do not store any payment information. All transactions are handled securely by our trusted payment gateways.",
    },
    {
      question: "How is my personal information used?",
      answer:
        "Your personal data is used only to provide our services. We follow strict data protection laws and never share your information with third parties without your consent.",
    },
    {
      question: "What steps are taken to prevent data breaches?",
      answer:
        "We use robust firewalls, encryption, and regular security audits to ensure that your data is safe from breaches and unauthorized access.",
    },
    {
      question: "How can I reset my password if I forget it?",
      answer:
        "You can reset your password by clicking on the 'Forgot Password' link on the login page. We will send you an email with instructions to reset it.",
    },
  ],
};

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

export const STOCK_RESEARCH_CONFIG = {
  "small-cap": {
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

  "mid-cap": {
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

  "large-cap": {
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
    image: "/product-details.jpeg",
    postedAt: "15 Jan 2024",
  },
  {
    id: 2,
    title: "How to Invest in Small Cap Stocks",
    description:
      "Small cap stocks offer great growth potential, but they come with higher risks. Learn how to invest wisely in small cap companies.",
    image: "/product-details.jpeg",
    postedAt: "22 Jan 2024",
  },
  {
    id: 3,
    title: "The Importance of Diversification",
    description:
      "Diversifying your investment portfolio is key to reducing risk and achieving long-term financial goals.",
    image: "/product-details.jpeg",
    postedAt: "29 Jan 2024",
  },
  {
    id: 4,
    title: "Mid Cap Stocks: A Balanced Investment",
    description:
      "Mid cap stocks provide a good balance between the high risk of small caps and the stability of large caps.",
    image: "/product-details.jpeg",
    postedAt: "05 Feb 2024",
  },
  {
    id: 5,
    title: "Analyzing Large Cap Stocks",
    description:
      "Large cap stocks are known for their stability and solid returns. Discover how to analyze and invest in them.",
    image: "/product-details.jpeg",
    postedAt: "12 Feb 2024",
  },
  {
    id: 6,
    title: "Top Strategies for Stock Market Beginners",
    description:
      "If you're new to the stock market, learn some top strategies to help you start your investment journey with confidence.",
    image: "/product-details.jpeg",
    postedAt: "19 Feb 2024",
  },
  {
    id: 7,
    title: "How to Time the Market: Is It Possible?",
    description:
      "Timing the market can be risky, but some strategies may help you make the most of market fluctuations.",
    image: "/product-details.jpeg",
    postedAt: "26 Feb 2024",
  },
  {
    id: 8,
    title: "The Role of Dividends in Your Portfolio",
    description:
      "Dividends can provide a steady income stream. Learn how to include dividend-paying stocks in your investment portfolio.",
    image: "/product-details.jpeg",
    postedAt: "04 Mar 2024",
  },
  {
    id: 9,
    title: "Why Market Volatility is an Opportunity",
    description:
      "Market volatility can cause uncertainty, but it also presents opportunities for smart investors to buy low and sell high.",
    image: "/product-details.jpeg",
    postedAt: "11 Mar 2024",
  },
  {
    id: 10,
    title: "Understanding Stock Buybacks",
    description:
      "Stock buybacks can influence a company's stock price. Discover how they work and how they can affect your investments.",
    image: "/product-details.jpeg",
    postedAt: "18 Mar 2024",
  },
  {
    id: 11,
    title: "The Difference Between Growth and Value Stocks",
    description:
      "Growth and value stocks are two different investment approaches. Learn the difference and which may be right for you.",
    image: "/product-details.jpeg",
    postedAt: "25 Mar 2024",
  },
  {
    id: 12,
    title: "Impact of Interest Rates on Stock Markets",
    description:
      "Interest rates can significantly influence the stock market. Explore how rate changes impact stock prices.",
    image: "/product-details.jpeg",
    postedAt: "01 Apr 2024",
  },
  {
    id: 13,
    title: "Top Sectors to Watch in 2024",
    description:
      "Certain sectors are expected to perform well in 2024. Discover which industries might offer the best opportunities.",
    image: "/product-details.jpeg",
    postedAt: "08 Apr 2024",
  },
  {
    id: 14,
    title: "What to Know About Stock Splits",
    description:
      "Stock splits don't change a company's value, but they can affect the number of shares you own. Learn more about stock splits.",
    image: "/product-details.jpeg",
    postedAt: "15 Apr 2024",
  },
  {
    id: 15,
    title: "Psychology of Stock Trading: Keeping Your Emotions in Check",
    description:
      "Trading stocks is as much about psychology as it is about strategy. Learn how to manage emotions when making trades.",
    image: "/product-details.jpeg",
    postedAt: "22 Apr 2024",
  },
];

export const PAPERS = [
  {
    id: 1,
    name: "Stock Paper (RP0010)",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
    stockName: "Adani Enterprises Limited",
    stockSymbol: "ADANIENT.NS",
    buyPrice: 3105.1,
    target: 3430.0,
  },
  {
    id: 2,
    name: "Stock Paper (RP0011)",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
    stockName: "Reliance Industries Limited",
    stockSymbol: "RELIANCE.NS",
    buyPrice: 2400.5,
    target: 2700.0,
  },
  {
    id: 3,
    name: "Stock Paper (RP0012)",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
    stockName: "Tata Consultancy Services",
    stockSymbol: "TCS.NS",
    buyPrice: 3800.0,
    target: 4200.0,
  },
  {
    id: 4,
    name: "Stock Paper (RP0013)",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
    stockName: "HDFC Bank Limited",
    stockSymbol: "HDFCBANK.NS",
    buyPrice: 1400.0,
    target: 1550.0,
  },
  {
    id: 5,
    name: "Stock Paper (RP0014)",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
    stockName: "Infosys Limited",
    stockSymbol: "INFY.NS",
    buyPrice: 1500.0,
    target: 1650.0,
  },
  {
    id: 6,
    name: "Stock Paper (RP0015)",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
    stockName: "State Bank of India",
    stockSymbol: "SBIN.NS",
    buyPrice: 600.0,
    target: 670.0,
  },
  {
    id: 7,
    name: "Stock Paper (RP0016)",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
    stockName: "Hindustan Unilever Limited",
    stockSymbol: "HINDUNILVR.NS",
    buyPrice: 2600.0,
    target: 2900.0,
  },
  {
    id: 8,
    name: "Stock Paper (RP0017)",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
    stockName: "Bharti Airtel Limited",
    stockSymbol: "BHARTIARTL.NS",
    buyPrice: 700.0,
    target: 780.0,
  },
  {
    id: 9,
    name: "Stock Paper (RP0018)",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
    stockName: "ICICI Bank Limited",
    stockSymbol: "ICICIBANK.NS",
    buyPrice: 800.0,
    target: 850.0,
  },
  {
    id: 10,
    name: "Stock Paper (RP0019)",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
    stockName: "Larsen & Toubro Limited",
    stockSymbol: "LT.NS",
    buyPrice: 2200.0,
    target: 2500.0,
  },
  {
    id: 11,
    name: "Stock Paper (RP0020)",
    pdfLink:
      "https://crafterswealth.com/wp-content/uploads/woocommerce_uploads/2024/09/RP0074-plsxlg.pdf",
    stockName: "Maruti Suzuki India Limited",
    stockSymbol: "MARUTI.NS",
    buyPrice: 8000.0,
    target: 8800.0,
  },
];

export const customDropDownStyles = {
  control: (provided: any) => ({
    ...provided,
    border: "1px solid #ccc",
    boxShadow: "none",
    padding: "3px",
    "&:hover": {
      border: "1px solid #ccc",
    },
    marginBottom: "0",
    borderRadius: "0.375rem",
    fontSize: "14px",
  }),
  menu: (provided: any) => ({
    ...provided,
    zIndex: 9999,
    marginTop: "0",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#f0f0f0" : "#fff",
    color: "#333",
    padding: "10px",
    fontSize: "14px",
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    padding: "5px",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#7a7a7a",
    fontSize: "14px",
    fontWeight: "normal",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    fontSize: "14px",
  }),
};
