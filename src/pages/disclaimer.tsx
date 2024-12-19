import Title from "@/components/common/Title";
import SEOHead from "@/components/seo/SeoHead";
import { Separator } from "@/components/ui/separator";
import React from "react";

const DisclaimerPage = () => {
  const pageName = "Legal Disclaimer";
  const pageDescription =
    "Investment in securities market is subject to market risks. Read all the related documents carefully before investing.  Registration granted by SEBI and certification from NISM in no way, guarantees the performance of the intermediary or provides any assurance of returns to investors.";
  return (
    <>
      <SEOHead title={pageName} description={pageDescription} />
      <main>
        <section className="text-center banner-2 md:text-start layout grid place-content-center pb-16">
          <Title text={pageName} className="text-center !mb-0" />
        </section>

        <section className="layout pb-16 text-center space-y-5">
          <p>
            Investment in securities market is subject to market risks. Read all
            the related documents carefully before investing. Registration
            granted by SEBI and certification from NISM in no way, guarantees
            the performance of the intermediary or provides any assurance of
            returns to investors.
          </p>
          <p>
            All rights are reserved. You will not copy, reproduce, or distribute
            this Research Paper, whether wholly or in part, to anyone, for any
            purpose without the permission of Crafters Financial Research
            Private Limited. This is strictly prohibited. Any such act will be
            deemed to be a copyright infringement.
          </p>
          <p>
            Crafters Financial Research Private Limited (Research Analyst)
            bearing SEBI Registration No. INH000016117 (hereinafter referred to
            as &apos;CraftersWealth&apos;) is an independent equity research
            Company. CraftersWealth is not an Investment Adviser.
          </p>
          <p>
            All the Research Papers contained herein and the website are to be
            regarded as a resource only and the user, buyer, subscriber of this
            information should consider the use of these at their own risk. This
            will not constitute as an offer to buy or sell or solicitation to
            buy or sell any securities. All losses incurred or investment(s)
            made or decisions taken/or not taken, based on the Research Papers
            published or provided herein, is the sole responsibility of the
            user/subscriber/purchaser of this information. Crafters will not be
            liable for any loss incurred by the individual and/or organization
            that buys this information.
          </p>

          <p>
            The Research Papers published herein does not constitute a
            personalized advice, or a recommendation, or the investment
            objectives, or the financial situation, or needs of individual
            subscribers. Before acting on any recommendation, subscribers should
            seek independent professional advice suitable for their
            circumstances.
          </p>

          <p>
            If you are a resident of the USA, Canada, or the European Union
            countries, please seek legal advice before acting on any information
            contained herein.
          </p>
          <p>
            All Research Papers contained herein are provided on an &apos;As
            Is&apos; basis by CraftersWealth. We believe that all the data or
            Information contained in the Research Paper and the website is
            reliable. CraftersWealth does not warrant the completeness or
            accuracy and expressly disclaims all warranties and conditions of
            any kind, whether express or implied.
          </p>
          <p>
            As a pre-condition to accessing CraftersWealth Research Papers and
            website, you agree to our Terms and Conditions, available herein.
            The performance data quoted represents past performance and does not
            guarantee future results.
          </p>
          <p>
            SEBI (Research Analysts) Regulations 2014, Registration No.
            INH000016117.
          </p>

          <Separator />

          <div className=" font-bold text-center space-y-2">
            <p>CRAFTERS FINANCIAL RESEARCH PRIVATE LIMITED</p>
            <p>
              # A-303, 2nd Floor, 17th Main, IGV Apartments, Ideal Home
              Township, R.R. Nagar, Bangalore-98.
            </p>
            <p> Mobile: +91 96063 94742</p>
            <p>CIN: U71200KA2024PTC184260 / GSTIN: 29AALCC6221H1ZK</p>
          </div>
        </section>
      </main>
    </>
  );
};

export default DisclaimerPage;
