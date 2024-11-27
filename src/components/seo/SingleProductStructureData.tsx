import React from "react";
import Head from "next/head";
import { PRODUCTS_DETAIL } from "@/lib/routes";

interface ProductDetails {
  title: string;
  aboutStock: string;
  type: string;
}

interface SingleProductStructuredDataProps {
  productDetails: ProductDetails;
  id: string | string[] | undefined;
  type: string | string[] | undefined;
}

const SingleProductStructuredData: React.FC<
  SingleProductStructuredDataProps
> = ({ productDetails, id, type }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productDetails.title,
    description: productDetails.aboutStock,
    brand: {
      "@type": "Brand",
      name: productDetails.type,
    },
    url: `${PRODUCTS_DETAIL}/?type=${type}&id=${id}`,
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

export default SingleProductStructuredData;
