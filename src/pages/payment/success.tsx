import PageLoader from "@/components/ui/page-loader";
import useProcessOrder from "@/lib/hooks/use-order-payload";

import { useApp } from "@/lib/provider/app-provider";
import { useAuth } from "@/lib/provider/auth-provider";
import { UPDATE_ORDER_MUTATION } from "@/lib/queries/products.query";
import {
  SEND_EMAIL_MUTATION,
  UPDATE_USER_META,
} from "@/lib/queries/users.query";
import { MY_PAPERS, PAYMENT_FAILURE, PAYMENT_SUCCESS } from "@/lib/routes";
import { AppActionTypes } from "@/lib/types/common/app";
import { InvoiceData, OrderStatus } from "@/lib/types/checkout";
import {
  AuthActionTypes,
  SessionObject,
  Subscription,
} from "@/lib/types/common/user";
import { addDurationToDate, decodeNumericId } from "@/lib/utils";
import { useMutation } from "@apollo/client";
import { produce } from "immer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import PageStructuredData from "@/components/seo/PageStructuredData";
import SEOHead from "@/components/seo/SeoHead";
import useInvoiceGeneration from "@/lib/hooks/use-invoice-pdf";
import { generateInvoiceEmailTemplate } from "@/lib/utils/email-templates/invoice";
import { toast } from "@/lib/hooks/use-toast";
import { ACCOUNTS_EMAIL, OFFICIAL_EMAIL } from "@/lib/constants";

const SuccessPage = () => {
  const router = useRouter();
  const { query } = router;

  const transactId = query.id;
  const { payment, products, appDispatch, allProducts } = useApp();
  const {
    user,
    authDispatch,
    redirectTrigger,
    setRedirectTrigger,
    isAuthenticated,
  } = useAuth();
  const { data: session } = useSession();
  const { getSuccessOrderPayload } = useProcessOrder();
  const { generateInvoice } = useInvoiceGeneration();

  const [textMessage, setTextMessage] = useState("Processing Order...");

  const gotToPaymentFailurePage = () => {
    router.push(PAYMENT_FAILURE);
  };

  const subscription = useMemo(() => {
    const subscriptionMap: Subscription = {
      ...user.subscription,
    };

    user.cart.forEach((item) => {
      if (item.period !== "0" && item.period) {
        const access = item.access.length ? item.access : [item.category];
        const newPeriod = addDurationToDate(item.period);

        access.forEach((category) => {
          if (!subscriptionMap[category]) {
            subscriptionMap[category] = {
              plan: item.plan,
              period: newPeriod.toISOString(),
            };
          } else {
            const existingPeriod = new Date(subscriptionMap[category].period);
            if (newPeriod > existingPeriod) {
              subscriptionMap[category] = {
                plan: item.plan,
                period: newPeriod.toISOString(),
              };
            }
          }
        });
      }
    });

    return subscriptionMap;
  }, [user.cart, user.subscription]);

  const bought = useMemo(() => {
    const boughtSet = new Set<string>();

    user.cart.forEach((item) => {
      if (item.access.length) {
        item.access.forEach((category) => {
          const product = products.find(
            (product) => product.productCategories.nodes[0].slug === category
          );

          if (product) {
            const productId = decodeNumericId(product.id).toString();
            boughtSet.add(productId);
            const pIndex =
              allProducts[category].findIndex((pid) => pid === productId) + 1;
            const archives = allProducts[category].slice(pIndex, pIndex + 10);
            archives.forEach((item) => boughtSet.add(item));
          }
        });
      } else {
        const arr = allProducts[item.category] ?? [];
        const pIndex =
          arr.findIndex((pid) => pid === item.productId.toString()) + 1;
        boughtSet.add(item.productId.toString());
        const archives = arr.slice(pIndex, pIndex + 10);
        archives.forEach((item) => boughtSet.add(item));
      }
    });

    return Array.from(new Set([...user.bought, ...Array.from(boughtSet)]));
  }, [user.cart, products, user.bought, allProducts]);

  const [updateUserMeta] = useMutation(UPDATE_USER_META, {
    onCompleted: (data) => {
      setTextMessage("Order confirmed!");
      const status = data?.updateUserMeta?.statusCode;
      if (status === 200) {
        const updatedUser = produce(user, (draft) => {
          draft.cart = [];
          draft.bought = bought;
          draft.subscription = subscription;
        });

        authDispatch({
          type: AuthActionTypes.SET_USER_DETAILS,
          payload: updatedUser,
        });

        appDispatch({ type: AppActionTypes.CLEAR_PAYMENT });

        setTimeout(() => {
          router.push(MY_PAPERS);
        }, 3000);
      }
    },
    onError: () => {
      setTextMessage("Order failed!");
      gotToPaymentFailurePage();
    },
  });

  const [sendEmail] = useMutation(SEND_EMAIL_MUTATION);

  const [updateOrder] = useMutation(UPDATE_ORDER_MUTATION, {
    onCompleted: async (data) => {
      if (data?.updateOrder?.order?.status === OrderStatus.COMPLETED) {
        if (!isAuthenticated() || !user.id) {
          return setRedirectTrigger(!redirectTrigger);
        }

        setTextMessage("Placing your order...");

        const variables = {
          input: {
            email: user.email,
            bought,
            subscription,
          },
        };

        await updateUserMeta({
          variables,
          context: {
            headers: {
              Authorization: `Bearer ${(session as SessionObject).authToken}`,
            },
          },
        });
      }
    },
    onError: () => {
      setTextMessage("Order failed!");
      gotToPaymentFailurePage();
    },
  });

  const processOrder = async () => {
    if (!isAuthenticated() || !user.id) {
      return setRedirectTrigger(!redirectTrigger);
    }

    try {
      setTextMessage("Generating Invoice...");

      const { data, invoiceData } = await generateInvoice();
      const pdfLink = data.wordpressMediaUrl ?? "";
      const emailHtml = generateInvoiceEmailTemplate(
        invoiceData as InvoiceData,
        pdfLink
      );
      const emailRecipients = [user.email, ACCOUNTS_EMAIL];
      const inputPayload = getSuccessOrderPayload();
      setTextMessage("Processing order...");

      await updateOrder({
        variables: {
          input: inputPayload,
        },
        context: {
          headers: {
            Authorization: `Bearer ${(session as SessionObject).authToken}`,
          },
        },
      });

      setTextMessage("Sending invoice");

      await Promise.all(
        emailRecipients.map((recipient) =>
          sendEmail({
            variables: {
              input: {
                body: emailHtml,
                from: OFFICIAL_EMAIL,
                subject: "Invoice Email",
                to: recipient,
              },
            },
          })
        )
      );
    } catch (error) {
      setTextMessage("Order failed!");
      toast({
        title: "Order failed!",
        description: "Failed to generate invoice",
        variant: "destructive",
      });
      gotToPaymentFailurePage();
    }
  };

  useEffect(() => {
    if (
      isAuthenticated() &&
      user.id &&
      payment.orderId &&
      payment.transactionId === transactId
    ) {
      processOrder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payment, session, user.id]);

  const pageName = "Payment Success - Your Purchase is Confirmed";
  const pageDescription =
    "Thank you for your purchase! Your order has been successfully processed. Access your purchased items now.";

  return (
    <>
      <SEOHead
        title={pageName}
        description={pageDescription}
        keywords="order success, purchase confirmed, payment success, CraftersWealth"
      />
      <PageStructuredData
        name={pageName}
        description={pageDescription}
        url={PAYMENT_SUCCESS}
      />
      <PageLoader className="h-screen" text={textMessage} />
    </>
  );
};

export default SuccessPage;
