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
  const [isMounted, setIsMounted] = useState(false);
  const [isAchievementsLoading, setIsAchievementsLoading] =
    useState<boolean>(true);
  const { user, redirectTrigger, setRedirectTrigger, isAuthenticated } =
    useAuth();
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

  const fetchCountries = async () => {
    if (!state.countries.length) {
      try {
        const restCountriesResponse = await axios.get(
          process.env.NEXT_PUBLIC_REST_COUNTRIES_API!
        );
        const restCountriesData = restCountriesResponse.data;

        const restCountries = restCountriesData.map((country: any) => ({
          name: country.name.common,
          code: country.cca2,
          flag: country.flags.svg,
        }));

        let geoNamesCountries = [];
        try {
          const geoNamesResponse = await axios.get(
            process.env.NEXT_PUBLIC_GEO_NAMES_COUNTRIES_API!
          );
          const geoNamesData = geoNamesResponse.data;

          geoNamesCountries = geoNamesData.geonames.map((country: any) => ({
            name: country.countryName,
            code: country.countryCode,
            geoNameId: country.geonameId,
          }));
        } catch {
          toast({
            title: "Oops! Something went wrong",
            description: "Countries data from GeoNames could not be fetched",
            variant: "destructive",
          });
        }

        const countries = restCountries.map((restCountry: any) => {
          const geoCountry = geoNamesCountries.find(
            (geoCountry: any) => geoCountry.code === restCountry.code
          );
          return {
            ...restCountry,
            geoNameId: geoCountry?.geoNameId || null,
          };
        });

        dispatch({ type: AppActionTypes.SET_COUNTRIES, payload: countries });
      } catch {
        toast({
          title: "Oops! Something went wrong",
          description:
            "Countries data from REST Countries could not be fetched",
          variant: "destructive",
        });
      }
    }
  };

  const fetchAchievements = async () => {
    setIsAchievementsLoading(true);
    try {
      const { data } = await axios.get(GET_ACHIEVEMENT_API);
      dispatch({ type: AppActionTypes.SET_ACHIEVEMENTS, payload: data });
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
    fetchCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        countries: state.countries,
        isAchievementsLoading: isAchievementsLoading,
        achievements: state.achievements,
        invoiceNumber: state.invoiceNumber,
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
