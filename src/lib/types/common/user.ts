import { forgotPasswordSchema } from "@/lib/utils";
import { Session, User } from "next-auth";
import { z } from "zod";
import { Cart } from "../products";

export type Subscription = Record<
  string,
  { plan: string; period: string; duration: string }
>;

export interface UserOrders {
  orderNumber: string;
  invoiceNumber: string;
  coupons: string[];
  invoice: string;
  totalPaid: number;
  date: string;
  products: {
    name: string;
    productId: string | number;
    period: string;
  }[];
}

export interface SavedDataType {
  orders: UserOrders[];
}
export interface UserDetails {
  firstName: string;
  email: string;
  isEmailVerified: boolean;
  bought: string[];
  lastName: string;
  productsInvested: string[];
  productsViewed: string[];
  roles: { nodes: { displayName: string; name: string }[] };
  id: string;
  cart: Cart[];
  phoneNumber: string;
  city: string;
  country: string;
  address: string;
  postcode: string;
  state: string;
  subscription: Subscription;
  savedData: SavedDataType;
}

export interface UserObject extends User {
  authToken: string;
  userId: string;
}

export interface SessionObject extends Session {
  authToken: string;
  userId: string;
}

export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  phoneNumber: number;
  email: string;
  password: string;
  confirmPassword: string;
}

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export interface AuthState {
  user: UserDetails;
}

export enum AuthActionTypes {
  SET_USER_DETAILS = "SET_USER_DETAILS",
  CLEAR_USER_DETAILS = "CLEAR_USER_DETAILS",
}

export type AuthAction =
  | {
      type: AuthActionTypes.SET_USER_DETAILS;
      payload: UserDetails;
    }
  | {
      type: AuthActionTypes.CLEAR_USER_DETAILS;
    };
export interface AuthContextProps {
  user: UserDetails;
  authDispatch: React.Dispatch<AuthAction>;
  setRedirectTrigger: React.Dispatch<boolean>;
  isAuthLoading: boolean;
  redirectTrigger: boolean;
  isAuthenticated: () => boolean;
  isUserSubscribedToEitherCategory: () => boolean;
}
