import Head from "next/head";
import {
  BASE_URL,
  DEFAULT_IMAGE,
  DEFAULT_TWITTER_CARD,
  SITE_NAME,
  TWITTER_CREATOR,
} from "@/lib/constants";

interface SEOHeadProps {
  title: string;
  description?: string;
  keywords?: string;
  url?: string;
  image?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description = "CraftersWealth offers expert-backed investment insights and research papers to help you make informed decisions in the stock market.",
  keywords = "investment products, stocks to buy, stock market trends, best investments, CraftersWealth products",
  url = BASE_URL,
  image = DEFAULT_IMAGE,
}) => (
  <Head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{`${title} - ${SITE_NAME}`}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={url} />
    <meta property="og:site_name" content={SITE_NAME} />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content={DEFAULT_TWITTER_CARD} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
    <meta name="twitter:creator" content={TWITTER_CREATOR} />
    <link rel="canonical" href={url} />
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

export default SEOHead;
