import {
  AuthAction,
  AuthActionTypes,
  AuthState,
  UserDetails,
} from "@/lib/types/common/user";
import { produce } from "immer";

export const initialUser: UserDetails = {
  firstName: "",
  lastName: "",
  email: "",
  isEmailVerified: false,
  bought: [],
  productsInvested: [],
  productsViewed: [],
  roles: { nodes: [] },
  id: "",
  cart: [],
  phoneNumber: "",
  city: "",
  country: "",
  address: "",
  postcode: "",
  state: "",
  subscription: {},
};

export const userInitialState: AuthState = {
  user: initialUser,
};

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  return produce(state, (draft: { user: UserDetails }) => {
    switch (action.type) {
      case AuthActionTypes.SET_USER_DETAILS:
        draft.user = action.payload;
        break;
      case AuthActionTypes.CLEAR_USER_DETAILS:
        draft.user = initialUser;
        break;
      default:
        return state;
    }
  });
};
