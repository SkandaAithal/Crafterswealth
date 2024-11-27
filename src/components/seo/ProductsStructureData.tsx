import { PLAN, PRODUCTS_DETAIL } from "@/lib/routes";
import { ProductsProps } from "@/lib/types/products";
import Head from "next/head";

const ProductStructuredData: React.FC<ProductsProps> = ({ products }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, index) => {
      const firstCategory =
        product.productCategories.nodes[0]?.slug ?? "default";
      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.name,
          image: product.featuredImage.node.sourceUrl,
          description: product.stock.description,
          brand: {
            "@type": "Brand",
            name: product.productCategories.nodes[0]?.name || "Unknown Brand",
          },
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            price: product.plans[0]?.plans[0]?.sale_price || 0,
            availability: "https://schema.org/InStock",
            url: `${PLAN}/${product.id}`,
          },
          url: `${PRODUCTS_DETAIL}/?type=${firstCategory}&id=${product.id}`,
        },
      };
    }),
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
};

export default ProductStructuredData;
