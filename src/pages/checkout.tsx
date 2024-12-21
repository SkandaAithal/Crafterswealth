import CheckoutForm from "@/components/checkout/CheckoutForm";
import AnimateOnce from "@/components/common/AnimateOnce";
import Title from "@/components/common/Title";
import PageStructuredData from "@/components/seo/PageStructuredData";
import SEOHead from "@/components/seo/SeoHead";
import { CHECKOUT } from "@/lib/routes";
import { NextPage } from "next";
import React from "react";

const CheckoutPage: NextPage = () => {
  const pageName = "Checkout - Complete Your Purchase";
  const pageDescription =
    "Securely complete your purchase with CraftersWealth. Provide your details and finalize your order with ease.";
  return (
    <main className="min-h-[calc(100dvh-75px)] md:min-h-[calc(100dvh-100px)]">
      <SEOHead
        title={pageName}
        description={pageDescription}
        keywords="checkout, payment, order, secure checkout, finalize purchase"
      />
      <PageStructuredData
        name={pageName}
        description={pageDescription}
        url={CHECKOUT}
      />

      <section className="text-center banner-2 md:text-start grid md:grid-cols-2 layout pb-10">
        <Title text="Checkout" />
      </section>
      <AnimateOnce>
        <CheckoutForm />
      </AnimateOnce>
    </main>
  );
};

export default CheckoutPage;
