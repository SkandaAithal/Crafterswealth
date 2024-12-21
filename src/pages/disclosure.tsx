import Title from "@/components/common/Title";
import SEOHead from "@/components/seo/SeoHead";
import React from "react";

const DisclosurePage = () => {
  const pageName = "Disclosure";

  return (
    <>
      <SEOHead title={pageName} />
      <main>
        <section className="text-center banner-2 md:text-start layout grid place-content-center pb-16">
          <Title text={pageName} className="text-center !mb-0" />
        </section>

        <section className="layout pb-16">
          <ol className="list-decimal pl-5 space-y-4">
            <li>
              The Research entity or Research analyst or his associates or his
              relatives have no financial interest in the subject company.
            </li>
            <li>
              The Research analyst or research entity or its associates or
              relatives, have no actual/beneficial ownership of one per cent or
              more in securities of the subject company, at the end of the month
              immediately preceding the date of publication of the research
              report or date of the public appearance or research
              recommendation.
            </li>
            <li>
              The Research analyst or research entity or its associates or
              relatives, have no material conflicts of interest, at the time of
              publication of the research report or at the time of the public
              appearance.
            </li>
            <li>
              The Research analyst or research entity or its associates or
              relatives, have not received any compensation from the subject
              company in the past twelve months.
            </li>
            <li>
              The Research analyst or research entity or its associates or
              relatives, have not managed or co-managed the public offering of
              securities of the subject company in past twelve months.
            </li>
            <li>
              The Research analyst or research entity or its associates or
              relatives, have not received any compensation for investment
              banking or merchant banking or brokerage services from the subject
              company in past twelve months.
            </li>
            <li>
              The Research analyst or research entity or its associates or
              relatives, have not received any compensation for products or
              services other than investment banking or merchant banking or
              brokerage services from the subject company in the past twelve
              months.
            </li>
            <li>
              The Research analyst or research entity or its associates or
              relatives, have not received any compensation or other benefits
              from the subject company or third party in connection with the
              research report.
            </li>
            <li>
              The Research analyst or research entity or its associates or
              relatives, have not received any compensation for any public
              appearances for products or services, from the subject company in
              past twelve months.
            </li>
            <li>
              The subject company is or was not a client of the Research analyst
              or research entity or its associates or relatives, during twelve
              months preceding the date of distribution of the research report.
            </li>
            <li>
              The Research analyst or research entity or its associates or
              relatives, shall not be required to make a disclosure as per
              sub-clauses (c), (d) and (e) of clause (ii) or sub-clauses (a) and
              (b) of clause (iii) to the extent such disclosure would reveal
              material non-public information regarding specific potential
              future investment banking or merchant banking or brokerage
              services transactions of the subject company.
            </li>
            <li>
              The Research Analyst has not served as an officer, director, or
              employee of the subject company.
            </li>
            <li>
              The Research analyst or research entity, have not been engaged in
              market making activity of the subject company.
            </li>
            <li>
              All the other disclosures in the research report and public
              appearances are as specified by the Board under any other
              regulations.
            </li>
            <li>
              The Research Report has been generated using artificial
              intelligence (AI) following the identification of an opportunity
              by our proprietary in-house software. Clients are hereby advised
              to thoroughly assess all potential risks associated with the use
              of generative AI.
            </li>
          </ol>
        </section>
      </main>
    </>
  );
};

export default DisclosurePage;
