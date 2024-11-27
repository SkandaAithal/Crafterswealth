import React from "react";
import Head from "next/head";

interface PageStructuredDataProps {
  name: string;
  description: string;
  url: string;
}

const PageStructuredData: React.FC<PageStructuredDataProps> = ({
  name,
  description,
  url,
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </Head>
  );
};

export default PageStructuredData;
