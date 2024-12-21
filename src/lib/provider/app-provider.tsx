import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
} from "react";
import { AppActionTypes, AppContextProps } from "../types/common/app";
import usePersistentReducer from "../hooks/use-persistent-reducer";
import { appReducer, initialState } from "../utils/app";
import { APP_INFO, FETCH_TIME } from "../constants";
import {
  GET_ALL_PRODUCT_IDS_BY_CATEGORY,
  GET_PRODUCT_CATEGORIES,
} from "../queries/products.query";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  AllProducts,
  GetProductByCategoryData,
  ProductCategory,
} from "../types/products";
import { useAuth } from "./auth-provider";
import { SessionObject } from "../types/common/user";
import { UPDATE_USER_META } from "../queries/users.query";
import { toast } from "../hooks/use-toast";
import { getSession } from "next-auth/react";
import axios from "axios";
import { GET_ACHIEVEMENT_API } from "../routes";

const AppContext = createContext<AppContextProps | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = usePersistentReducer(
    appReducer,
    initialState,
    APP_INFO
  );
  const {
    categories,
    products,
    achievements,
    forgotPassword,
    invoice,
    payment,
    verifyEmail,
    triggerInvoice,
  } = state;

  const [isMounted, setIsMounted] = useState(false);
  const [isAchievementsLoading, setIsAchievementsLoading] =
    useState<boolean>(true);
  const { user, redirectTrigger, setRedirectTrigger, isAuthenticated } =
    useAuth();
  const { subscription, bought } = user;
  const [getCategories, { data, loading: isCategoriesLoading }] = useLazyQuery(
    GET_PRODUCT_CATEGORIES,
    {
      fetchPolicy: "cache-first",
    }
  );
  const { data: allProductsData, loading: isAllProductsLoading } =
    useQuery<GetProductByCategoryData>(GET_ALL_PRODUCT_IDS_BY_CATEGORY, {
      fetchPolicy: "cache-first",
    });
  const [updateUserMeta] = useMutation(UPDATE_USER_META);
  const FETCH_INTERVAL_MS = 60 * 60 * 1000;
  const isAdmin = user?.roles?.nodes[0]?.name === "administrator";

  const allProductsWithNames = useMemo(
    () => allProductsData?.allProductsByCategory ?? {},
    [allProductsData]
  );

  const allProducts = useMemo(() => {
    return Object.keys(allProductsWithNames).reduce(
      (acc: Record<string, string[]>, category: string) => {
        acc[category] = allProductsWithNames[category].map(
          (product: { id: string }) => product.id
        );
        return acc;
      },
      {} as Record<string, string[]>
    );
  }, [allProductsWithNames]);

  const latestProducts = useMemo(() => {
    const result: Record<string, AllProducts> = {};

    Object.keys(allProductsWithNames).forEach((category) => {
      if (allProductsWithNames[category].length > 0) {
        const firstProduct = allProductsWithNames[category][0];
        result[category] = {
          id: firstProduct.id,
          name: firstProduct.name,
        };
      }
    });

    return result;
  }, [allProductsWithNames]);

  function isSubscribed(expiryDate: string) {
    const currentDate = new Date();
    const subscriptionExpiryDate = new Date(expiryDate);
    return currentDate < subscriptionExpiryDate;
  }

  const boughtObject = useMemo(() => {
    const result: Record<string, string[]> = {};
    if (isAdmin) {
      categories.forEach((category) => {
        if (allProducts[category.slug]) {
          result[category.slug] = allProducts[category.slug].filter(
            (product) => !bought.includes(product)
          );
        }
      });
    } else {
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
    }

    return result;
  }, [isAdmin, categories, allProducts, subscription, bought]);

  const allUniqueItems = useMemo(() => {
    return Array.from(new Set(Object.values(boughtObject).flat()));
  }, [boughtObject]);

  const boughtArray = useMemo(() => {
    return [...allUniqueItems, ...user.bought];
  }, [allUniqueItems, user.bought]);

  const updateUserBoughtPapers = async () => {
    if (allUniqueItems.length > 0 && user.bought.length > 0) {
      const session = await getSession();
      if (!isAuthenticated() || !user.id) {
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

  const fetchAchievements = async () => {
    const lastFetchTime = localStorage.getItem(FETCH_TIME);
    const isFetchNeeded =
      !lastFetchTime ||
      new Date().getTime() - new Date(lastFetchTime).getTime() >
        FETCH_INTERVAL_MS;

    if (!isFetchNeeded) {
      setIsAchievementsLoading(false);
      return;
    }

    setIsAchievementsLoading(true);
    try {
      const { data } = await axios.get(GET_ACHIEVEMENT_API);
      dispatch({ type: AppActionTypes.SET_ACHIEVEMENTS, payload: data });
      localStorage.setItem(FETCH_TIME, new Date().toISOString());
    } catch (error) {
      toast({
        title: "Oops! Something went wrong",
        description: "Achievements could not be fetched",
        variant: "destructive",
      });
    } finally {
      setIsAchievementsLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    fetchAchievements();
    if (!categories.length) {
      getCategories();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      const ctgry = (data?.productCategories?.nodes as ProductCategory[]) ?? [];
      dispatch({ type: AppActionTypes.ADD_CATEGORIES, payload: ctgry });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.productCategories?.nodes]);

  return (
    <AppContext.Provider
      value={{
        appDispatch: dispatch,
        products,
        verifyEmail,
        forgotPassword,
        isMounted,
        payment,
        isAppLoading: isCategoriesLoading || isAllProductsLoading,
        categories,
        boughtObject,
        allProducts,
        latestProducts,
        isAchievementsLoading,
        achievements,
        invoice,
        triggerInvoice,
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
