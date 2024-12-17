import CartComponent from "@/components/cart/CartComponent";
import Title from "@/components/common/Title";
import PageStructuredData from "@/components/seo/PageStructuredData";
import SEOHead from "@/components/seo/SeoHead";

import { CART } from "@/lib/routes";

import React from "react";

const CartPage = () => {
  const pageName = "Cart - Review Your Selections";
  const pageDescription =
    "View the items in your cart and proceed to checkout. Manage your selected products and finalize your order with ease.";
  return (
    <main className="min-h-[calc(100dvh-75px)] md:min-h-[calc(100dvh-100px)]">
      <SEOHead
        title={pageName}
        description={pageDescription}
        keywords="cart, checkout, shopping cart, selected products, CraftersWealth"
      />
      <PageStructuredData
        name={pageName}
        description={pageDescription}
        url={CART}
      />

      <section className="text-center banner-2 md:text-start grid md:grid-cols-2 layout pb-10">
        <Title text="Your Cart" />
      </section>
      <CartComponent />
    </main>
  );
};

export default CartPage;
