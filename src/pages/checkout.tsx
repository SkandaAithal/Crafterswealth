import AuthWrapper from "@/components/auth/AuthWrapper";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import AnimateOnce from "@/components/common/AnimateOnce";
import Title from "@/components/common/Title";
import { CheckoutProps } from "@/lib/types/common/checkout";
import axios from "axios";
import { NextPage } from "next";
import React from "react";

const CheckoutPage: NextPage<CheckoutProps> = ({ countries }) => {
  return (
    <AuthWrapper>
      <main className="min-h-[calc(100dvh-75px)] md:min-h-[calc(100dvh-100px)]">
        <section className="text-center banner-2 md:text-start grid md:grid-cols-2 layout pb-10">
          <Title text="Checkout" />
        </section>
        <AnimateOnce>
          <CheckoutForm countries={countries} />
        </AnimateOnce>
      </main>
    </AuthWrapper>
  );
};

export const getStaticProps = async () => {
  const restCountriesResponse = await axios.get(
    process.env.NEXT_PUBLIC_REST_COUNTRIES_API!
  );
  const restCountriesData = restCountriesResponse.data;

  const restCountries = restCountriesData.map((country: any) => ({
    name: country.name.common,
    code: country.cca2,
    flag: country.flags.svg,
  }));

  const geoNamesResponse = await axios.get(
    process.env.NEXT_PUBLIC_GEO_NAMES_COUNTRIES_API!
  );
  const geoNamesData = geoNamesResponse.data;

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
