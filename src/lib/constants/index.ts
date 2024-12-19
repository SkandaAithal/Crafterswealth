import { PiArticleMediumLight } from "react-icons/pi";
import {
  ABOUT_US,
  ARTICLES,
  CONTACT,
  DISCLAIMER,
  DISCLOSURE,
  HOME,
  MY_PAPERS,
  PRIVACY_POLICY,
  PRODUCTS,
  REFUND_POLICY,
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
  FaCheckCircle,
  FaBookOpen,
  FaChartPie,
  FaClock,
  FaUserPlus,
  FaTasks,
  FaFileAlt,
} from "react-icons/fa";

export const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY!;
export const GEO_NAMES_USER_NAME = process.env.NEXT_PUBLIC_GEO_NAME_USER_NAME!;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
export const SUPPORT_EMAIL = "support@crafterswealth.com";
export const OFFICIAL_EMAIL = "Rishabh@crafterswealth.com";
export const ACCOUNTS_EMAIL = "account@crafterswealth.com";
export const APP_INFO = "app-info";
export const FETCH_TIME = "fetch-sync";

//seo
export const DEFAULT_IMAGE = "/opengraph-crafterswealth.jpg";
export const DEFAULT_TWITTER_CARD = "summary_large_image";
export const SITE_NAME = "CraftersWealth";
export const TWITTER_CREATOR = "@CraftersWealth";

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
  { name: "About Us", route: ABOUT_US },
  { name: "Contact Us", route: CONTACT },
];

export const FOOTER_ROUTES = [
  { name: "Home", route: HOME },
  { name: "Refund Policy", route: REFUND_POLICY },
  {
    name: "Investor Charter",
    route:
      "https://crafterswealth.com/wp-content/uploads/2024/12/Investment-Charter_Circular.pdf",
    inNewTab: true,
  },
  { name: "Disclosure", route: DISCLOSURE },
];

export const BOTTOM_FOOTER_ROUTES = [
  { name: "Privacy Policy", route: PRIVACY_POLICY },
  { name: "Disclaimer", route: DISCLAIMER },
  { name: "Terms and Conditions", route: TERMS_AND_CONDITION },
];

export const ICONS = [
  "/icons/icon-1.png",
  "/icons/icon-2.png",
  "/icons/icon-3.png",
  "/icons/icon-4.png",
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
  [InvestmentType.ValueSprint]: {
    [TimePeriod.OneMonth]: {
      [InvestmentType.ValueSprint]: 0.125,
      [InvestmentType.Nifty50]: 0.04,
      [InvestmentType.MutualFund]: 0.037,
    },
    [TimePeriod.ThreeMonths]: {
      [InvestmentType.ValueSprint]: 0.375,
      [InvestmentType.Nifty50]: 0.08,
      [InvestmentType.MutualFund]: 0.12,
    },
    [TimePeriod.SixMonths]: {
      [InvestmentType.ValueSprint]: 0.65,
      [InvestmentType.Nifty50]: 0.12,
      [InvestmentType.MutualFund]: 0.25,
    },
  },
  [InvestmentType.MomentumPulse]: {
    [TimePeriod.OneMonth]: {
      [InvestmentType.MomentumPulse]: 0.105,
      [InvestmentType.Nifty50]: 0.04,
      [InvestmentType.MutualFund]: 0.037,
    },
    [TimePeriod.ThreeMonths]: {
      [InvestmentType.MomentumPulse]: 0.3,
      [InvestmentType.Nifty50]: 0.12,
      [InvestmentType.MutualFund]: 0.25,
    },
    [TimePeriod.SixMonths]: {
      [InvestmentType.MomentumPulse]: 0.55,
      [InvestmentType.Nifty50]: 0.12,
      [InvestmentType.MutualFund]: 0.25,
    },
  },
};

export const FAQ_DATA = {
  about: [
    {
      question: "What is CraftersWealth and what services do you offer?",
      answer:
        "CraftersWealth is a SEBI-registered financial research firm specializing in comprehensive stock market research, algorithm-driven insights, and educational content. Our services include high-quality equity research reports, real-time market insights, and customer-centric solutions designed to help investors achieve consistent and profitable returns.",
    },
    {
      question: "Who are the founders of CraftersWealth?",
      answer:
        "CraftersWealth was co-founded by Raghu Srinivasan, a Chartered Accountant with over 40 years of expertise in corporate finance and taxation, and Rishabh Rao, a technology innovator with a background in Computer Science and a passion for the financial markets.",
    },
    {
      question:
        "How does CraftersWealth differentiate itself from other financial research firms?",
      answer:
        "CraftersWealth stands out by blending decades of financial expertise with innovative technology. Here’s what sets us apart:\n\n- Personalized Behavioral Finance Tools: We offer tailored advice based on an investor's psychological profile, helping align strategies with individual mindsets.\n- Affordable, Transparent Pricing: Our value-driven pricing ensures clarity, with detailed breakdowns for each service tier.\n- Tech-Driven, Real-Time Recommendations: Proprietary algorithms provide actionable, data-backed insights for timely decisions.\n- Holistic Investment Solutions: A one-stop platform integrating research, advisory, education, and software, streamlining the investment journey.\n\nThis comprehensive approach empowers our clients to make confident and profitable investment choices.",
    },
    {
      question: "Is CraftersWealth a SEBI-registered firm?",
      answer:
        "Yes, CraftersWealth is a SEBI-registered Research Analyst firm under the name Crafters Financial Research Private Limited (Research Analyst) with SEBI Registration No. INH000016117. This ensures that we adhere to strict regulatory standards, guaranteeing transparency, accountability, and ethical practices in all our research and services.",
    },
    {
      question: "Who can benefit from your services?",
      answer:
        "Our services cater to a diverse range of investors, from beginners seeking foundational guidance to experienced professionals aiming for consistent market success. In addition to offering profitable stock research, we provide educational content, including insights, tutorials, and market updates, to empower investors with the knowledge they need to make informed decisions. Whether you're an individual or a business, our solutions are tailored to meet your financial goals.",
    },
  ],
  research: [
    {
      question: "What kind of research papers do you provide?",
      answer:
        "Each paper is an in-depth analysis of a single stock, providing actionable buy/sell signals based on a combination of fundamental and technical analysis. Our proprietary software, backed by thorough backtesting, delivers high success rates and clear, reliable recommendations.",
    },
    {
      question: "How often are new research papers released?",
      answer:
        "New research papers are released every day, ensuring that our subscribers have access to the latest, most relevant stock market insights on a daily basis.",
    },
    {
      question: "How are your research papers priced?",
      answer:
        "Our research papers are priced with value in mind, offering transparent pricing models for all service tiers. Subscribers can choose a plan that aligns with their investment goals.",
    },
    {
      question: "What makes your research reports different from other firms?",
      answer:
        "Our reports are unique due to our use of proprietary software, high success rates, and daily updates. We combine technical and fundamental analysis, offering easy-to-understand buy/sell signals based on backtested data and personalized insights.",
    },
    {
      question: "How can I access your research papers?",
      answer:
        "To access our research papers, subscribe to our service. You will gain access to an exclusive dashboard for regular updates and personalized stock recommendations sent directly to your email.",
    },
  ],
  pricing: [
    {
      question: "What pricing plans do you offer for your services?",
      answer:
        "We offer both Standard and Premium plans for all our products. The Standard plan includes one single transactional paper(₹199) or a monthly(₹499) access to all products. The Premium plan offers full access to all products with three options: Quarterly (₹1199), Half-Yearly (₹2199), and Yearly (₹3999).",
    },
    {
      question: "Are there any free trials or sample reports available?",
      answer:
        "Yes! Our Standard plan offers a one-time transactional paper at ₹199, with 10 free papers from our archive. You can also subscribe for a month at ₹499 to access all papers.",
    },
    {
      question: "How do I know which pricing plan is right for me?",
      answer:
        "Choose a plan based on your risk tolerance and product preference. If you’re looking to try out services on a budget, the ₹199 paper is a good start. Most customers prefer the Quarterly Plan because it bundles access to all our products, making it cost-effective.",
    },
    {
      question: "Do you offer any discounts or promotional offers?",
      answer:
        "Yes, keep an eye out for special promotions or limited-time offers that may come up.",
    },
    {
      question: "Can I upgrade my plan at any time?",
      answer:
        "Yes, you can easily upgrade from a Standard to a Premium plan at any time. We will ensure you get the remaining value of your previous plan applied to the new one.",
    },
  ],
  technology: [
    {
      question:
        "What technology and tools do you use to generate your research?",
      answer:
        "We use proprietary algorithms combined with advanced technical and fundamental analysis tools. Our research is powered by custom-built software and data analytics platforms to generate real-time, actionable insights.",
    },
    {
      question: "Are your algorithms proprietary, and how are they developed?",
      answer:
        "Yes, our algorithms are proprietary and developed by a dedicated team using statistical models, backtesting techniques, and years of market data. They are continuously refined to ensure the best performance.",
    },
    {
      question:
        "How do you ensure the accuracy of your research with technology?",
      answer:
        "Our research is backed by rigorous testing using historical data, continuous monitoring, and real-time analysis. We ensure accuracy by leveraging cutting-edge models, expert reviews, and backtesting tools.",
    },
    {
      question: "Can I use your software to make investments directly?",
      answer:
        "Our software provides actionable recommendations, but it does not allow direct usage. You can implement our insights through your brokerage platform by accessing our premium research reports.",
    },
    {
      question: "Is your technology constantly updated?",
      answer:
        "Yes, we continually update our technology to keep up with market changes and incorporate the latest developments in financial data analysis, ensuring you always have access to the most reliable information.",
    },
  ],
  support: [
    {
      question: "How can I contact customer support?",
      answer:
        "You can contact customer support via email at support@crafterswealth.com or through WhatsApp. Our team is available to assist you with any inquiries or issues.",
    },
    {
      question: "What do I do in case of a payment failure?",
      answer:
        "If you experience a payment failure, don’t worry. Your transaction will be reverted within 7 business days. If the issue persists, please contact our support team immediately. We'll help resolve the issue.",
    },
    {
      question:
        "What kind of support is available to subscribers of your services?",
      answer:
        "Subscribers can access basic or priority support, depending on their plan. We offer email support, phone support for urgent issues, and personalized assistance for premium users.",
    },
    {
      question: "Is there any additional support for new users?",
      answer:
        "Yes, we offer onboarding assistance for new users, including tutorials, FAQs, and an introductory guide to our services. Our customer support team is also available to help you get started.",
    },
  ],
};

export const creds = {
  type: "service_account",
  project_id: "crafterswealth-demo",
  private_key_id: "80deeb2aa069ecee0a002fb29d42258c7aff4617",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQChzY7gyVZHnmqG\nIhGua9Qdk4GWUim+nFdv7muK7OH3nMy3348yCzjrmq0c3fBD3Xr/X6Ypyb8f7ncy\nL51uoil2EaM9jMzT8HLXN1X5yi9yOwUFzAS33sg5vwE3vMt5f8oDZNdFCMDxuVt+\nxrX3n0k6Anw1Zyi5aUqvdS05eOGZDjx52m01TIUxvhneIeDt1X1/7edfLVS9AG6O\nzD6+ktFwxUnTKpm1aNCfjCF956fpEiofGcMKV3FG49mI5zwDSUHcSY9dCRrr3+kk\n0TcEZCE5E0W1l4dctP7ZRUMlycZ0nwfakcR4Xgn0GJnbALcZmsOXwDiCXmDE/tfY\nfYL6YmTLAgMBAAECggEAJT6JVHHT4/FxqMV/12vnrBUvn5fzFvaq4894PsbPLu2P\nbAXQUt8lb4ovrfTiYOTC8rSkLXtMfL+p/UnbjcNTEuP1dO4Lmf9/l82bgz+Ik11F\nhzOSpHZqFWzDjX5uQd3p9MUKDlB5BUs65eA8s66dLvaye6Juy9sSP3gT/GY4W7/+\n8Oj6L+Fth6haONdi26jP7XlllQ99IvsVrJdsp9e4ThXdvnTvofeB6kbvA5kYkY71\n+Z0VAJWpE6DcKxeRMj17M0uH4r6e5d+N4p5gZYTrzdxOO8WycF6N4UCVDZKgl9K5\nUT6Ag8RpWhV28c8aXXOQCrXl275y2Dj3VD4ufFwRSQKBgQDP8BoMTeiBiNSN9jjh\nZIvCqy0v9zJfQACITodRAtXGm0x4nh3Tg9zjSA+SDiWBX8rWFKZr2A1NhPGcqIDa\n83svX+rmRsXOWRQLOdvoQGmx0SgbJjBbYrupQQ3YjVpGzbOruSfWX9oz88OHDNjm\nZT+UIB9xqXDmvoypo/soPbihWQKBgQDHM5rfkeTpNfFlq1ng+yudfDTmcGeY3etu\nWNK1Uhx2NublRvVnsrX9NljKjQEUqg45T9kf1EX83+QJk8bSqWnxLXj8fVI68Rcz\nVUMQTQwr+Jo5/jWbhMvxq59K7UpodHiJ9ViOk23zgOzVyzGHEAMWCqxvFb4hCCvz\nFAungh2uwwKBgQCLFmKGCnLUem8bCjCf6z5lF1TheasS9V+lzUlMEeZms6hiIfl3\nawOMb74ihx3lPOsTabqr9ldnm951WGzgh+7FEJayM3LKhOEYZTpITxWj4HDAQDom\nVpOKMj6NtHdHVv6wheg0x+bPy2TlZ92Jtv3hGd+OirU/UwQJ0OsFzss5+QKBgQCu\n9IwZwDGlAlO6T/zotLFh6C0uF5tlj8OvbyPhTPTifuXcia4QHc3pT0o83AsO8yz6\n+T5hzjaKGrpWDwyZCWKbCK0yVX9bdVRDKad1MbZ3CCmstbCvnrrgzzNgw3iOtX0I\n7guRbbssGxfnzkb5sP6E5Wr9RcNvj5XKMNjrjkQzsQKBgBAcbuZFvLVxo4q64xWE\ns3UUBMbUWKqkRpbp8S01qfqt+w+iPXWssuY4X++bha5QpOvYhr+OU5A/pv/uxEuS\nVgnpmOdKc1le5rOrMZcdzrDDVI2vi8DvFkzElW5ZMiySVRDmwWBMpkxd+r6dvqOn\nA3+uCRGw1lpIlI1B+pEPPmrf\n-----END PRIVATE KEY-----\n",
  client_email:
    "crafterswealth-spreadsheet@crafterswealth-demo.iam.gserviceaccount.com",
  client_id: "114593522544168159598",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/crafterswealth-spreadsheet%40crafterswealth-demo.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
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
  "value-sprint": {
    title: InvestmentType.ValueSprint,
    tableKey: InvestmentType.ValueSprint,
    subtitle: "Unlock Short-Term Gains with Value Sprint Strategy",
    type: InvestmentType.ValueSprint,
    amazingFeatures:
      "Understand the core features that make Value Sprint a powerful strategy for identifying undervalued stocks.",
    aboutStock:
      "Value Sprint is designed to uncover undervalued stocks with high growth potential. With a short-term focus, this strategy aims to identify hidden gems in the market, offering significant returns in a brief period. By leveraging in-depth research and analysis, we select stocks that are poised for strong price movement, ensuring a promising investment opportunity with a proven success rate.",

    features: [
      {
        title: "High Success Rate",
        description:
          "With an 85% success rate, Value Sprint delivers reliable results even in uncertain market conditions.",
        icon: FaRocket,
      },
      {
        title: "Short-Term Focus",
        description:
          "The strategy targets stocks with strong potential for short-term growth, holding for an average of just 10 days.",
        icon: FaSearchDollar,
      },
      {
        title: "Undervalued Stocks",
        description:
          "Focuses on stocks that are currently undervalued, offering opportunities for significant growth in the near term.",
        icon: FaChartLine,
      },
      {
        title: "Resilient in Down Markets",
        description:
          "Even during market downturns, Value Sprint identifies stocks with strong growth potential, ensuring continued profitability.",
        icon: FaBalanceScale,
      },
      {
        title: "Moderate Returns with Minimal Risk",
        description:
          "Achieves average gains of 5% per trade, balancing steady returns with limited exposure to risk.",
        icon: FaUniversity,
      },
      {
        title: "Targeted Stock Picks",
        description:
          "Identifies high-potential mid, small, and large-cap stocks that are positioned for quick price movement.",
        icon: FaShieldAlt,
      },
    ],
  },

  "momentum-pulse": {
    title: InvestmentType.MomentumPulse,
    tableKey: InvestmentType.MomentumPulse,
    subtitle: "Strategic Investing for Momentum-Driven Gains",
    amazingFeatures:
      "Understand the core features that drive our high-performing Momentum Pulse strategy.",
    type: InvestmentType.MomentumPulse,
    aboutStock:
      "Momentum Pulse is crafted for investors who seek to ride market trends confidently. This strategy combines the power of detailed research with a focus on momentum-driven opportunities in financially sound mid, large, and small-cap stocks. Perfect for medium-term growth seekers, it’s designed to align with dynamic market movements and deliver actionable insights.",

    features: [
      {
        title: "Proven Success Rate",
        description:
          "Momentum Pulse maintains a 95% success rate, ensuring reliable and profitable results.",
        icon: FaCheckCircle,
      },
      {
        title: "Comprehensive Research",
        description:
          "Combines both technical and fundamental analysis to provide a well-rounded market outlook.",
        icon: FaBookOpen,
      },
      {
        title: "Quality Stock Selection",
        description:
          "Focuses on mid, large, and small-cap stocks with strong financials and growth potential.",
        icon: FaChartPie,
      },
      {
        title: "Medium Holding Period",
        description:
          "Average holding time of 45 days, balancing between short-term gains and long-term growth.",
        icon: FaClock,
      },
      {
        title: "Consistent Returns",
        description:
          "Achieves an average gain of 11.5% per trade, optimizing returns with a balanced approach.",
        icon: FaChartLine,
      },
      {
        title: "Medium-Risk Strategy",
        description:
          "Designed for investors who want to take a moderate risk to achieve significant returns, ensuring a balanced approach to portfolio growth.",
        icon: FaBalanceScale,
      },
    ],
  },
};

export const STEPS_DETAILS = [
  {
    icon: FaUserPlus,
    title: "Sign Up",
    description:
      "Create an account and choose your preferred plan. You'll gain instant access to exclusive research and strategies tailored to your investment goals.",
    step: 1,
  },
  {
    icon: FaFileAlt,
    title: "Access Research",
    description:
      "Get access to detailed reports with actionable buy/sell signals. Our expert analysis will guide you in making informed investment decisions.",
    step: 2,
  },
  {
    icon: FaTasks,
    title: "Implement Insights",
    description:
      "Use the buy/sell recommendations from our reports on your brokerage platform to execute trades. Our insights are designed for easy application.",
    step: 3,
  },
  {
    icon: FaChartLine,
    title: "Track and Optimize",
    description:
      "Monitor your investments regularly and receive continuous updates to optimize your portfolio, ensuring you're always aligned with market trends.",
    step: 4,
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
