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
import {
  FaChartLine,
  FaSearchDollar,
  FaShieldAlt,
  FaRocket,
  FaBalanceScale,
  FaUniversity,
} from "react-icons/fa";

export const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY!;
export const GEO_NAMES_USER_NAME = process.env.NEXT_PUBLIC_GEO_NAME_USER_NAME!;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
export const APP_INFO = "app-info";

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

export const MarketBarChartGraphData = {
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

export const MarketCapBarChartGraphData = {
  [TimePeriod.OneMonth]: {
    [InvestmentType.SmallCap]: 0.115,
    [InvestmentType.MidCap]: 0.08,
    [InvestmentType.LargeCap]: 0.04,
  },
  [TimePeriod.ThreeMonths]: {
    [InvestmentType.SmallCap]: 0.14,
    [InvestmentType.MidCap]: 0.12,
    [InvestmentType.LargeCap]: 0.15,
  },
  [TimePeriod.SixMonths]: {
    [InvestmentType.SmallCap]: 0.31,
    [InvestmentType.MidCap]: 0.23,
    [InvestmentType.LargeCap]: 0.35,
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

export const PRODUCT_DETAILS_CONFIG = {
  "small-cap": {
    title: "Small Cap Stock Research",
    tableKey: "Small Cap",
    subtitle: "Unlock Explosive Growth with High-Potential Small Caps 📈",
    type: InvestmentType.SmallCap,
    aboutStock:
      "Small cap stocks represent companies with smaller market capitalization, typically ranging from ₹100 crore to ₹5,000 crore. These stocks are more volatile but have greater potential for substantial growth, often outperforming larger stocks during bull markets.",

    features: [
      {
        title: "High Growth Potential",
        description:
          "Focuses on identifying small cap stocks with high potential for substantial growth.",
        icon: FaRocket,
      },
      {
        title: "In-Depth Analysis",
        description:
          "Comprehensive technical and fundamental analysis, including insider and institutional data.",
        icon: FaSearchDollar,
      },
      {
        title: "Real-Time Insights",
        description:
          "Provides timely market insights and data to keep you competitive.",
        icon: FaChartLine,
      },
      {
        title: "Emerging Sectors",
        description:
          "Gain exposure to companies in emerging industries and technologies.",
        icon: FaBalanceScale,
      },
      {
        title: "Diversified Opportunities",
        description:
          "Investment in early-stage companies with diversified growth opportunities.",
        icon: FaUniversity,
      },
      {
        title: "Aggressive Returns",
        description:
          "Ideal for aggressive investors looking for high growth potential.",
        icon: FaShieldAlt,
      },
    ],
  },

  "mid-cap": {
    title: "Mid Cap Stock Research",
    tableKey: "Mid Cap",
    subtitle: "Seize the Sweet Spot: Balanced Growth with Mid Caps 🏆",
    type: InvestmentType.MidCap,
    aboutStock:
      "Mid cap stocks represent companies with a market capitalization between ₹5,000 crore and ₹20,000 crore. These companies offer a balance between growth potential and stability, often considered a 'sweet spot' for risk and reward in the stock market.",

    features: [
      {
        title: "Balanced Growth",
        description:
          "Offers a mix of growth potential and stability, ideal for moderate-risk investors.",
        icon: FaBalanceScale,
      },
      {
        title: "Proven Stability",
        description:
          "Focuses on companies with proven track records and stable growth.",
        icon: FaShieldAlt,
      },
      {
        title: "Sectoral Analysis",
        description:
          "Includes in-depth sectoral and peer comparisons to guide investment.",
        icon: FaUniversity,
      },
      {
        title: "Economic Expansion",
        description:
          "Mid caps tend to outperform in periods of economic growth.",
        icon: FaChartLine,
      },
      {
        title: "Predictive Models",
        description:
          "Access to predictive data models for making informed decisions.",
        icon: FaSearchDollar,
      },
      {
        title: "Growth Potential",
        description:
          "Invest in companies with the potential to become future large caps.",
        icon: FaRocket,
      },
    ],
  },

  "large-cap": {
    title: "Large Cap Stock Research",
    tableKey: "Large Cap",
    subtitle: "Stability Meets Growth: Your Secure Investment in Large Caps 💼",
    type: InvestmentType.LargeCap,
    aboutStock:
      "Large cap stocks are shares of companies with a market capitalization above ₹20,000 crore. These companies are typically well-established, financially stable, and provide a lower-risk investment option.",

    features: [
      {
        title: "Lower Risk",
        description:
          "Large caps are less volatile and provide a safer investment option.",
        icon: FaShieldAlt,
      },
      {
        title: "Dividend Income",
        description: "Stable companies offering reliable dividend yields.",
        icon: FaUniversity,
      },
      {
        title: "Long-Term Stability",
        description:
          "Ideal for conservative investors focused on wealth preservation.",
        icon: FaBalanceScale,
      },
      {
        title: "Macro Analysis",
        description: "Includes macroeconomic insights and trend analysis.",
        icon: FaChartLine,
      },
      {
        title: "Global Market Trends",
        description:
          "Monitors global conditions to optimize large cap strategies.",
        icon: FaSearchDollar,
      },
      {
        title: "Wealth Preservation",
        description: "Focus on long-term growth with minimal risk.",
        icon: FaShieldAlt,
      },
    ],
  },
};

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
