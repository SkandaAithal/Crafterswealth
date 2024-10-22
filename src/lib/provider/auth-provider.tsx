import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import usePersistentReducer from "../hooks/use-persistent-reducer";
import {
  AuthActionTypes,
  AuthContextProps,
  SessionObject,
  UserDetails,
} from "../types/common/user";
import { USER_INFO } from "../constants";
import { authReducer, userInitialState } from "../utils/auth";
import { useSession } from "next-auth/react";
import { getUserDetails } from "../utils/auth/handlers";
import { toast } from "../hooks/use-toast";

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = usePersistentReducer(
    authReducer,
    userInitialState,
    USER_INFO
  );
  const [redirectTrigger, setRedirectTrigger] = useState<boolean>(false);

  const { data } = useSession();
  const session = data as SessionObject;

  useEffect(() => {
    const fetchUserDetails = async () => {
      dispatch({ type: AuthActionTypes.IS_AUTH_LOADING, payload: true });
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
        dispatch({ type: AuthActionTypes.IS_AUTH_LOADING, payload: false });
      }
    };

    if (session && !state.user) {
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
