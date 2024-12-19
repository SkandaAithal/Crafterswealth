import Title from "@/components/common/Title";
import SEOHead from "@/components/seo/SeoHead";
import React from "react";

const RefundPolicy = () => {
  const pageName = "Refund Policy";

  return (
    <>
      <SEOHead title={pageName} />
      <main>
        <section className="text-center banner-2 md:text-start layout grid place-content-center pb-16">
          <Title text={pageName} className="text-center !mb-0" />
        </section>
        <section className="space-y-4 layout pb-16">
          <p>
            Thank you for choosing CraftersWealth portal for your subscription
            and we appreciate your trust in our services. This Refund Policy
            outlines our terms and conditions regarding the subscription
            payments and plans. We would like to categorically state that no
            refunds will be issued under normal circumstances.
          </p>
          <ul className="list-decimal pl-5 space-y-4">
            <li>
              <strong>No Refund:</strong>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  All subscription payments made to CraftersWealth Portal are
                  non-refundable. Once a payment is processed, it is considered
                  final, and no refunds will be provided. Please check the
                  payment plans carefully, before subscribing to any of the
                  plans.
                </li>
                <li>
                  If there is an inordinate delay in the activation of services,
                  after the payment is made, we will extend your subscription by
                  the number of days of delay, from our side.
                </li>
              </ul>
            </li>
            <li>
              <strong>Cancellation:</strong> In case you decide to cancel your
              subscription for any reason, please note that no refunds will be
              issued for the remaining duration of your subscription.
            </li>
            <li>
              <strong>Exceptions:</strong>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  In exceptional circumstances, CraftersWealth Portal may
                  consider a refund request. Such requests will be evaluated on
                  a case-by-case basis and are subject to our discretion.
                </li>
                <li>
                  The Customer will have to make an application for refund along
                  with the transaction number and original payment receipt if
                  any, generated at the time of making payments.
                </li>
              </ul>
            </li>
            <li>
              <strong>Contact Information:</strong> In case you have any
              questions or concerns regarding our No Refund Policy, you are
              requested to contact us at: support@crafterswealth.com
            </li>
            <li>
              <strong>Policy Updates:</strong> We reserve the right to make
              changes to this No Refund Policy at any time. All updates will be
              posted on our website, and the effective date will be modified
              accordingly.
            </li>
          </ul>
          <p className="mt-4 font-bold">
            By subscribing to our services, you acknowledge and agree to abide
            by this No Refund Policy.
          </p>
        </section>
      </main>
    </>
  );
};

export default RefundPolicy;
