import ProductsPage from "@/components/products/ProductsPage";
import ProductStructuredData from "@/components/seo/ProductsStructureData";
import SEOHead from "@/components/seo/SeoHead";

import client from "@/lib/apollo-client";
import useStockData from "@/lib/hooks/use-stock-data";
import { useAuth } from "@/lib/provider/auth-provider";

import {
  GET_PRODUCT_CATEGORIES,
  GET_PRODUCTS,
} from "@/lib/queries/products.query";

import { ProductNode, ProductsProps } from "@/lib/types/products";
import { decodeNumericId } from "@/lib/utils";
import { GetStaticProps, NextPage } from "next";
import React, { useMemo } from "react";

const Products: NextPage<ProductsProps> = ({ products, categories = [] }) => {
  const DESCRIPTION =
    "Backed by years of experience and a team of seasoned analysts, CraftersWealth boasts of an impressive 96% success rate.";
  const SYMBOLS = useMemo(
    () => products.map((product) => product.stock.stockSymbol),
    [products]
  );
  const {
    user,
    isUserSubscribedToEitherCategory,
    isAuthLoading,
    isAuthenticated,
  } = useAuth();
  const { stockData, loading } = useStockData(SYMBOLS, true);
  const isLoading = isAuthenticated() ? isAuthLoading || loading : loading;

  const filteredProducts = useMemo(() => {
    if (!stockData.length) return [];

    const finalProducts = isUserSubscribedToEitherCategory()
      ? products
      : products.filter(
          (product) =>
            !user.bought.includes(decodeNumericId(product.id).toString())
        );

    const categoryMap: Record<string, ProductNode> = {};

    finalProducts.forEach((product) => {
      const stockSymbol = product.stock.stockSymbol;
      const targetPrice = product.stock.target;
      const threshold = product.productCategories.nodes[0]?.threshold;

      const stock = stockData.find((data) => data.symbol === stockSymbol);
      if (!stock) return;

      const profitOrLossPercentage =
        ((targetPrice - stock.price) / stock.price) * 100;

      if (profitOrLossPercentage > threshold) {
        const category = product.productCategories.nodes[0]?.name;
        if (!categoryMap[category]) {
          categoryMap[category] = product;
        }
      }
    });

    return Object.values(categoryMap);
  }, [isUserSubscribedToEitherCategory, products, stockData, user.bought]);

  return (
    <main>
      <SEOHead title="Today's Must Buy" description={DESCRIPTION} />
      <ProductStructuredData products={products} />
      <ProductsPage
        products={filteredProducts}
        categories={categories}
        productsLoading={isLoading}
      />
    </main>
  );
};

export default Products;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data: categoriesData } = await client.query({
      query: GET_PRODUCT_CATEGORIES,
    });

    const categories = categoriesData?.productCategories?.nodes ?? [];

    const products = (
      await Promise.all(
        categories.map(async ({ name }: { name: string }) => {
          const { data } = await client.query({
            query: GET_PRODUCTS,
            variables: { categories: name },
          });
          const products = data?.products?.nodes ?? [];
          const filterTargetsReachedProducts = products.filter(
            (item: ProductNode) => !item?.stock?.targetReached
          );
          return filterTargetsReachedProducts;
        })
      )
    ).flat();

    return {
      props: {
        products,
        categories,
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      props: {
        products: [],
        categories: [],
      },
      revalidate: 60,
    };
  }
};
