import React from "react";
import Head from "next/head";
import { PLAN } from "@/lib/routes";
import { Plan } from "@/lib/types/plan";

interface PlansStructuredDataProps {
  name: string;
  description: string;
  planCategories: Plan[];
  id: string;
}

const PlansStructuredData: React.FC<PlansStructuredDataProps> = ({
  name,
  description,
  planCategories,
  id,
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name,
    description,
    url: `${PLAN}/${id}`,
    itemListElement: planCategories.flatMap((category, categoryIndex) =>
      category.plans.map((plan, planIndex) => ({
        "@type": "Offer",
        name: plan.type,
        description: plan.description,
        priceCurrency: "INR",
        price: plan.sale_price || plan.regular_price,
        availability: "https://schema.org/InStock",
        position: categoryIndex * 100 + planIndex + 1,
        url: `${PLAN}/${id}`,
      }))
    ),
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

export default PlansStructuredData;
