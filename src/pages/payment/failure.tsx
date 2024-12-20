import { Button } from "@/components/ui/button";
import LazyImage from "@/components/ui/lazy-image";
import PageLoader from "@/components/ui/page-loader";
import useProcessOrder from "@/lib/hooks/use-order-payload";
import { useApp } from "@/lib/provider/app-provider";
import { useAuth } from "@/lib/provider/auth-provider";
import { UPDATE_ORDER_MUTATION } from "@/lib/queries/products.query";
import { CONTACT, PAYMENT_FAILURE } from "@/lib/routes";
import { AppActionTypes } from "@/lib/types/common/app";
import { SessionObject } from "@/lib/types/common/user";
import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PageStructuredData from "@/components/seo/PageStructuredData";
import SEOHead from "@/components/seo/SeoHead";

const FailurePage = () => {
  const router = useRouter();
  const { payment, appDispatch } = useApp();
  const { user, setRedirectTrigger, redirectTrigger, isAuthenticated } =
    useAuth();
  const { data: session } = useSession();
  const { getFailureOrderPayload } = useProcessOrder();
  const [isLoading, setIsloading] = useState(true);
  const [updateOrder] = useMutation(UPDATE_ORDER_MUTATION);
  const processOrder = async () => {
    if (!isAuthenticated() || !user.id) {
      return setRedirectTrigger(!redirectTrigger);
    }
    const payload = getFailureOrderPayload();

    await updateOrder({
      variables: {
        input: payload,
      },
      context: {
        headers: {
          Authorization: `Bearer ${(session as SessionObject).authToken}`,
        },
      },
    });
    setIsloading(false);
  };

  useEffect(() => {
    if (isAuthenticated() && user.id && payment.orderId) {
      appDispatch({ type: AppActionTypes.CLEAR_ORDER });
      processOrder();
    } else {
      setIsloading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payment, session, user.id]);
  const pageName = "Payment Failure - Order Not Completed";
  const pageDescription =
    "Your order could not be completed due to a payment failure. Please try again or contact us for assistance.";

  return isLoading ? (
    <>
      <SEOHead
        title={pageName}
        description={pageDescription}
        keywords="payment failure, order failed, payment error, contact support"
      />
      <PageStructuredData
        name={pageName}
        description={pageDescription}
        url={PAYMENT_FAILURE}
      />
      <PageLoader
        className="h-screen fixed inset-0 z-[100]"
        text="Cancelling order"
      />
    </>
  ) : (
    <main className="min-h-[calc(100dvh-75px)] md:min-h-[calc(100dvh-100px)] layout grid place-content-center text-center gap-4 pb-20">
      <SEOHead
        title={pageName}
        description={pageDescription}
        keywords="payment failure, order failed, payment error, contact support"
      />
      <PageStructuredData
        name={pageName}
        description={pageDescription}
        url={PAYMENT_FAILURE}
      />
      <div className="mx-auto w-fit">
        <LazyImage
          alt="payment failed"
          src="/payment-fail.jpg"
          width={300}
          height={300}
          skeletonClassName="rounded-full"
        />
      </div>

      <div className="space-y-4 max-w-2xl">
        <h1 className="font-bold text-3xl">Your Order Didn’t Go Through</h1>
        <p>
          Unfortunately, we couldn’t complete your order. This could be due to a
          technical issue or payment details. Please try again or contact us for
          support.
        </p>
      </div>
      <Button
        className="w-full max-w-96 mx-auto"
        onClick={() => router.push(CONTACT)}
      >
        Contact us
      </Button>
    </main>
  );
};

export default FailurePage;
