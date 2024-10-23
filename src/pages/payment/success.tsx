import PageLoader from "@/components/ui/page-loader";

import { useApp } from "@/lib/provider/app-provider";
import { useAuth } from "@/lib/provider/auth-provider";
import { UPDATE_ORDER_MUTATION } from "@/lib/queries/products.query";
import { UPDATE_USER_META } from "@/lib/queries/users.query";
import { MY_PAPERS, PAYMENT_FAILURE } from "@/lib/routes";
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

const SuccessPage = () => {
  const router = useRouter();
  const { query } = router;

  const transactId = query.id;
  const { payment, products } = useApp();
  const { user, authDispatch } = useAuth();
  const { data: session } = useSession();

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
          }
        });
      } else {
        boughtSet.add(item.productId.toString());
      }
    });

    return Array.from(new Set([...user.bought, ...Array.from(boughtSet)]));
  }, [user.cart, products, user.bought]);

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

  const [updateOrder] = useMutation(UPDATE_ORDER_MUTATION, {
    onCompleted: async (data) => {
      if (data?.updateOrder?.order?.status === "COMPLETED") {
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
    const inputPayload = {
      customerId: decodeNumericId(user.id),
      billing: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phoneNumber,
        address1: user.address,
        city: user.city,
        postcode: user.postcode,
        country: user.country,
        state: user.state,
      },
      paymentMethod: "phonepe",
      transactionId: payment.transactionId,
      status: "COMPLETED",
      isPaid: true,
      orderId: payment.orderId,
    };

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
  };
  useEffect(() => {
    if (
      session &&
      user.id &&
      payment.orderId &&
      payment.transactionId === transactId
    ) {
      processOrder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payment, session, user.id]);
  return <PageLoader className="h-screen" text={textMessage} />;
};

export default SuccessPage;
