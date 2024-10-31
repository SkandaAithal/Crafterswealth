import PageLoader from "@/components/ui/page-loader";
import useProcessOrder from "@/lib/hooks/use-order-payload";

import { useApp } from "@/lib/provider/app-provider";
import { useAuth } from "@/lib/provider/auth-provider";
import { UPDATE_ORDER_MUTATION } from "@/lib/queries/products.query";
import { UPDATE_USER_META } from "@/lib/queries/users.query";
import { MY_PAPERS, PAYMENT_FAILURE } from "@/lib/routes";
import { AppActionTypes } from "@/lib/types/common/app";
import { OrderStatus } from "@/lib/types/checkout";
import {
  AuthActionTypes,
  SessionObject,
  Subscription,
} from "@/lib/types/common/user";
import { addDurationToDate, decodeNumericId } from "@/lib/utils";
import { useMutation } from "@apollo/client";
import { produce } from "immer";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { isTokenExpired } from "@/lib/utils/auth";

const SuccessPage = () => {
  const router = useRouter();
  const { query } = router;

  const transactId = query.id;
  const { payment, products, appDispatch, allProducts } = useApp();
  const { user, authDispatch, redirectTrigger, setRedirectTrigger } = useAuth();
  const { data: session } = useSession();
  const { getSuccessOrderPayload } = useProcessOrder();
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
        const pIndex =
          allProducts[item.category].findIndex(
            (pid) => pid === item.productId.toString()
          ) + 1;
        boughtSet.add(item.productId.toString());
        const archives = allProducts[item.category].slice(pIndex, pIndex + 10);
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

  const [updateOrder] = useMutation(UPDATE_ORDER_MUTATION, {
    onCompleted: async (data) => {
      if (data?.updateOrder?.order?.status === OrderStatus.COMPLETED) {
        setTextMessage("Placing your order...");
        const session = await getSession();
        if (isTokenExpired(session?.expires) || !user.id) {
          return setRedirectTrigger(!redirectTrigger);
        }
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
    const sess = await getSession();
    if (isTokenExpired(sess?.expires) || !user.id) {
      return setRedirectTrigger(!redirectTrigger);
    }
    const inputPayload = getSuccessOrderPayload();

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
      !isTokenExpired(session?.expires) &&
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
