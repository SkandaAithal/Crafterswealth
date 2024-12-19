import Title from "@/components/common/Title";
import SEOHead from "@/components/seo/SeoHead";
import { HOME } from "@/lib/routes";
import Link from "next/link";
import React from "react";

const PrivacyPolicy = () => {
  const pageName = "Privacy Policy";

  return (
    <>
      <SEOHead title={pageName} />
      <main>
        <section className="text-center banner-2 md:text-start layout grid place-content-center pb-16">
          <Title text={pageName} className="text-center !mb-0" />
        </section>
        <section className="layout pb-16 text-left space-y-8">
          <div>
            It is essential to maintain the privacy of all our user’s. This
            Privacy Policy document outlines the way we collect the user
            information, when you register with &nbsp;
            <Link href={HOME} className="font-bold">
              www.crafterswealth.com
            </Link>
            &nbsp;for any of our services and the way we treat your confidential
            information. We at Crafters Financial Research Private Limited
            thoroughly understand our responsibility to protect your
            information.
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-bold">
              What is the data that we collect from you?
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Your First Name and Last Name.</li>
              <li>Your Email ID.</li>
              <li>Your Mobile Phone Number.</li>
              <li>The State where you live and the Pin code of the area.</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-bold">
              How is the personal data utilised by our company?
            </h2>
            <p>The data that you provide helps us:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                To raise an invoice in your name, when you buy any of our
                products.
              </li>
              <li>
                The research report that you have bought from us is mailed to
                your email ID.
              </li>
              <li>
                The mobile phone number is used to provide you with a nudge for
                the latest investment opportunity that we may have for you.
              </li>
              <li>
                The State, Pin Code of the area, is an information for the
                purposes of Invoicing.
              </li>
              <li>
                We use third party payment gateway to process your payments. All
                the necessary security, legality, and the confidentiality about
                your account number, credit card number, UPI ID, etc, is being
                maintained by our service partners.
              </li>
              <li>
                We may send you information about our offerings periodically, on
                your email and/or mobile phone.
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Cookie Policy</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Users are informed that we may place a cookie on your device to
                collect non-personal information and data for future usage.
              </li>
              <li>
                Cookies are text files which a website uses to identify repeat
                users, facilitate the access, track behaviour, and compile the
                data for content improvement and/or targeted advertisement.
              </li>
              <li>
                You can change the cookie settings on your browser to accept or
                reject the cookies. If you do accept the cookies from our
                website, you hereby agree to our collection of the non-personal
                information or data and its usage.
              </li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
};

export default PrivacyPolicy;
