import ComplaintsTable from "@/components/common/ComplaintsTable";
import Title from "@/components/common/Title";
import SEOHead from "@/components/seo/SeoHead";

import React from "react";

const Grievances = () => {
  const pageName = "Grievances";

  return (
    <>
      <SEOHead title={pageName} />
      <main>
        <section className="text-center banner-2 md:text-start layout grid place-content-center pb-16">
          <Title text={pageName} className="text-center !mb-0" />
        </section>
        <section className="layout pb-16">
          <ComplaintsTable />
        </section>
      </main>
    </>
  );
};

export default Grievances;
