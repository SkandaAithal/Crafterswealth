import CheckoutForm from "@/components/checkout/CheckoutForm";
import AnimateOnce from "@/components/common/AnimateOnce";
import Title from "@/components/common/Title";
import PageStructuredData from "@/components/seo/PageStructuredData";
import SEOHead from "@/components/seo/SeoHead";
import { CHECKOUT } from "@/lib/routes";
import { CheckoutProps } from "@/lib/types/checkout";
import axios from "axios";
import { NextPage } from "next";
import React from "react";

const CheckoutPage: NextPage<CheckoutProps> = ({ countries }) => {
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
        <CheckoutForm countries={countries} />
      </AnimateOnce>
    </main>
  );
};

export const getStaticProps = async () => {
  try {
    const restCountriesResponse = await axios.get(
      process.env.NEXT_PUBLIC_REST_COUNTRIES_API!,
      { timeout: 10000 }
    );
    const restCountriesData = restCountriesResponse.data;

    const restCountries = restCountriesData.map((country: any) => ({
      name: country.name.common,
      code: country.cca2,
      flag: country.flags.svg,
    }));

    let geoNamesCountries = [];
    try {
      const geoNamesResponse = await axios.get(
        process.env.NEXT_PUBLIC_GEO_NAMES_COUNTRIES_API!,
        { timeout: 10000 }
      );
      const geoNamesData = geoNamesResponse.data;
      geoNamesCountries = geoNamesData.geonames.map((country: any) => ({
        name: country.countryName,
        code: country.countryCode,
        geoNameId: country.geonameId,
      }));
    } catch (error) {
      return {
        props: {
          countries: [],
        },
      };
    }

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
  } catch (error) {
    return {
      props: {
        countries: [],
      },
    };
  }
};
export default CheckoutPage;
