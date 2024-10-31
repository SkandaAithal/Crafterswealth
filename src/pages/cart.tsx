import CartComponent from "@/components/cart/CartComponent";
import Title from "@/components/common/Title";

import React from "react";

const CartPage = () => {
  return (
    <main className="min-h-[calc(100dvh-75px)] md:min-h-[calc(100dvh-100px)]">
      <section className="text-center banner-2 md:text-start grid md:grid-cols-2 layout pb-10">
        <Title text="Your Cart" />
      </section>
      <CartComponent />
    </main>
  );
};

export default CartPage;
