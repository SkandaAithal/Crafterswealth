import AuthWrapper from "@/components/auth/AuthWrapper";
import OrderSummary from "@/components/cart/OrderSummary";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import Title from "@/components/common/Title";
import { CheckoutProps } from "@/lib/types/common/checkout";
import { NextPage } from "next";
import React from "react";

const CheckoutPage: NextPage<CheckoutProps> = ({ countries }) => {
  return (
    <AuthWrapper>
      <main className="min-h-[calc(100dvh-75px)] md:min-h-[calc(100dvh-100px)]">
        <section className="text-center banner-2 md:text-start grid md:grid-cols-2 layout pb-10">
          <Title text="Checkout" />
        </section>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-x-10 layout !pb-40">
          <div className="md:order-1 order-2 col-span-2">
            <CheckoutForm countries={countries} />
          </div>
          <div className="md:order-2 order-1">
            <OrderSummary isCheckout />
          </div>
        </section>
      </main>
    </AuthWrapper>
  );
};

export const getStaticProps = async () => {
  const restCountriesResponse = await fetch(
    process.env.NEXT_PUBLIC_REST_COUNTRIES_API!
  );
  const restCountriesData = await restCountriesResponse.json();

  const restCountries = restCountriesData.map((country: any) => ({
    name: country.name.common,
    code: country.cca2,
    flag: country.flags.svg,
  }));

  const geoNamesResponse = await fetch(
    process.env.NEXT_PUBLIC_GEO_NAMES_COUNTRIES_API!
  );
  const geoNamesData = await geoNamesResponse.json();

  const geoNamesCountries = geoNamesData.geonames.map((country: any) => ({
    name: country.countryName,
    code: country.countryCode,
    geoNameId: country.geonameId,
  }));

  const countries = restCountries.map((restCountry: any) => {
    const geoCountry = geoNamesCountries.find(
      (geoCountry: any) => geoCountry.code === restCountry.code
    );
    return {
      ...restCountry,
      geoNameId: geoCountry?.geoNameId || null,
    };
  });

  return {
    props: {
      countries,
    },
  };
};

export default CheckoutPage;
