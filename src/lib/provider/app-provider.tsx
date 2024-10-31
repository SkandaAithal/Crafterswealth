import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
} from "react";
import { AppContextProps } from "../types/common/app";
import usePersistentReducer from "../hooks/use-persistent-reducer";
import { appReducer, initialState } from "../utils/app";
import { APP_INFO } from "../constants";
import {
  GET_ALL_PRODUCT_IDS_BY_CATEGORY,
  GET_PRODUCT_CATEGORIES,
} from "../queries/products.query";
import { useMutation, useQuery } from "@apollo/client";
import {
  GetProductIdsByCategoryData,
  ProductCategory,
} from "../types/products";
import { useAuth } from "./auth-provider";
import { SessionObject } from "../types/common/user";
import { UPDATE_USER_META } from "../queries/users.query";
import { toast } from "../hooks/use-toast";
import { isTokenExpired } from "../utils/auth";
import { getSession } from "next-auth/react";

const AppContext = createContext<AppContextProps | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = usePersistentReducer(
    appReducer,
    initialState,
    APP_INFO
  );
  const [isMounted, setIsMounted] = useState(false);
  const { user, redirectTrigger, setRedirectTrigger } = useAuth();
  const { subscription, bought } = user;
  const { data, loading: isCategoriesLoading } = useQuery(
    GET_PRODUCT_CATEGORIES,
    {
      fetchPolicy: "cache-first",
    }
  );
  const { data: allProductsData, loading: isAllProductsLoading } =
    useQuery<GetProductIdsByCategoryData>(GET_ALL_PRODUCT_IDS_BY_CATEGORY, {
      fetchPolicy: "cache-first",
    });
  const [updateUserMeta] = useMutation(UPDATE_USER_META);
  const categories = useMemo(
    () => (data?.productCategories?.nodes as ProductCategory[]) ?? [],
    [data]
  );
  const allProducts = useMemo(
    () => allProductsData?.allProductIdsByCategory ?? {},
    [allProductsData]
  );

  function isSubscribed(expiryDate: string) {
    const currentDate = new Date();
    const subscriptionExpiryDate = new Date(expiryDate);
    return currentDate < subscriptionExpiryDate;
  }

  const boughtObject = useMemo(() => {
    const result: Record<string, string[]> = {};

    categories.forEach((category) => {
      if (subscription[category.slug] && allProducts[category.slug]) {
        if (isSubscribed(subscription[category.slug].period)) {
          const indices = bought
            .map((id) => allProducts[category.slug].indexOf(id))
            .filter((index) => index !== -1);

          if (indices.length) {
            const lowestIndex = Math.min(...indices);
            const remainingIds = allProducts[category.slug].slice(
              0,
              lowestIndex
            );
            result[category.slug] = remainingIds;
          }
        }
      }
    });

    return result;
  }, [categories, subscription, bought, allProducts]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const allUniqueItems = useMemo(() => {
    return Array.from(new Set(Object.values(boughtObject).flat()));
  }, [boughtObject]);
  const boughtArray = useMemo(() => {
    return [...allUniqueItems, ...user.bought];
  }, [allUniqueItems, user.bought]);
  const updateUserBoughtPapers = async () => {
    if (allUniqueItems.length > 0 && user.bought.length > 0) {
      const session = await getSession();
      if (isTokenExpired(session?.expires) || !user.id) {
        return setRedirectTrigger(!redirectTrigger);
      }

      try {
        await updateUserMeta({
          variables: {
            input: {
              email: user.email,
              bought: boughtArray,
            },
          },
          context: {
            headers: {
              Authorization: `Bearer ${(session as SessionObject).authToken}`,
            },
          },
        });
      } catch (error) {
        toast({
          title: "Oops! Something went wrong",
          description: "Please try again",
          variant: "destructive",
        });
      }
    }
  };
  useEffect(() => {
    updateUserBoughtPapers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boughtArray]);
  return (
    <AppContext.Provider
      value={{
        appDispatch: dispatch,
        products: state.products,
        verifyEmail: state.verifyEmail,
        forgotPassword: state.forgotPassword,
        isMounted,
        payment: state.payment,
        isAppLoading: isCategoriesLoading || isAllProductsLoading,
        categories,
        boughtObject,
        allProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextProps => {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
