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
import { useSession } from "next-auth/react";
import { getUserDetails } from "../utils/auth/handlers";
import { toast } from "../hooks/use-toast";

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, userInitialState);
  const [redirectTrigger, setRedirectTrigger] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const { data } = useSession();
  const session = data as SessionObject;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails: UserDetails = await getUserDetails(
          session.authToken,
          session.userId
        );
        dispatch({
          type: AuthActionTypes.SET_USER_DETAILS,
          payload: userDetails,
        });
      } catch (error) {
        toast({
          title: "Something went wrong!",
          description:
            "Failed to get user details, Please try again by logging in again.",
          variant: "destructive",
        });
      } finally {
        setIsAuthLoading(false);
      }
    };

    if (session) {
      fetchUserDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <AuthContext.Provider
      value={{
        authDispatch: dispatch,
        ...state,
        setRedirectTrigger,
        redirectTrigger,
        isAuthLoading,
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
