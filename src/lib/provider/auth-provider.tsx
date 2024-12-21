import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  useReducer,
} from "react";
import {
  AuthActionTypes,
  AuthContextProps,
  SessionObject,
  UserDetails,
} from "../types/common/user";
import { authReducer, userInitialState } from "../utils/auth";
import { signOut, useSession } from "next-auth/react";
import { getUserDetails } from "../utils/auth/handlers";
import { toast } from "../hooks/use-toast";
import { HOME, LOGIN_PAGE, NEWSLETTER_API, PAGE_MAP } from "../routes";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import axios from "axios";
import { SUBSCRIPTION_STATUS } from "../constants";

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const pathName = usePathname();

  const [state, dispatch] = useReducer(authReducer, userInitialState);

  const [redirectTrigger, setRedirectTrigger] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const { data, status } = useSession();
  const session = data as SessionObject;

  const source =
    Object.keys(PAGE_MAP)
      .sort((a, b) => b.length - a.length)
      .find((key) => pathName?.startsWith(key)) || HOME;

  const subscribeUserToMailChimp = async (userDetails: UserDetails) => {
    const localStorageKey = SUBSCRIPTION_STATUS;

    try {
      const subscriptionStatus = JSON.parse(
        localStorage.getItem(localStorageKey) || "{}"
      );

      if (subscriptionStatus[userDetails.email] === "subscribed") {
        return;
      }

      await axios.post(NEWSLETTER_API, {
        email: userDetails.email,
        phone: userDetails.phoneNumber,
        source: PAGE_MAP[source as keyof typeof PAGE_MAP],
        firstName: userDetails.firstName || "",
        lastName: userDetails.lastName || "",
      });

      localStorage.setItem(
        localStorageKey,
        JSON.stringify({
          ...subscriptionStatus,
          [userDetails.email]: "subscribed",
        })
      );
    } catch (error: any) {
      if (error?.response?.status === 400) {
        const subscriptionStatus = JSON.parse(
          localStorage.getItem(localStorageKey) || "{}"
        );
        localStorage.setItem(
          localStorageKey,
          JSON.stringify({
            ...subscriptionStatus,
            [userDetails.email]: "subscribed",
          })
        );
      }
    }
  };

  const isAuthenticated = () => {
    const isLoad = status === "loading";
    return status === "authenticated" || isLoad;
  };

  const isUserSubscribedToEitherCategory = () => {
    const currentDate = new Date();

    return Object.values(state.user.subscription).some((subscription) => {
      const subscriptionPeriod = new Date(subscription.period);
      return subscriptionPeriod > currentDate;
    });
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsAuthLoading(true);

      try {
        const userDetails: UserDetails = await getUserDetails(
          session.authToken,
          session.userId
        );
        dispatch({
          type: AuthActionTypes.SET_USER_DETAILS,
          payload: userDetails,
        });
        await subscribeUserToMailChimp(userDetails);
      } catch (error) {
        toast({
          title: "Something went wrong!",
          description:
            "Failed to get user details, Please try again by logging in again.",
          variant: "destructive",
        });

        await signOut({ redirect: false });
        dispatch({ type: AuthActionTypes.CLEAR_USER_DETAILS });
        const loginUrl = `${LOGIN_PAGE}?redirect=${encodeURIComponent(pathName)}`;
        router.push(loginUrl);
      } finally {
        setIsAuthLoading(false);
      }
    };
    if (isAuthenticated() && !(status === "loading")) {
      fetchUserDetails();
    } else if (!(status === "loading")) {
      setIsAuthLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <AuthContext.Provider
      value={{
        authDispatch: dispatch,
        ...state,
        setRedirectTrigger,
        redirectTrigger,
        isAuthLoading,
        isAuthenticated,
        isUserSubscribedToEitherCategory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
