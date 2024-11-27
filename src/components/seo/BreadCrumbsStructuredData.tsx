import React from "react";
import Head from "next/head";

interface BreadcrumbRoute {
  label: string;
  href: string;
}

interface BreadcrumbStructuredDataProps {
  routes: BreadcrumbRoute[];
}

const BreadcrumbStructuredData: React.FC<BreadcrumbStructuredDataProps> = ({
  routes,
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: routes.map((route, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: route.label,
      item: route.href,
    })),
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

export default BreadcrumbStructuredData;
