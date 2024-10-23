import {
  AuthAction,
  AuthActionTypes,
  AuthState,
  UserDetails,
} from "@/lib/types/common/user";

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
  subscription: [],
};

export const userInitialState: AuthState = {
  user: initialUser,
};

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.SET_USER_DETAILS:
      return {
        ...state,
        user: action.payload,
      };
    case AuthActionTypes.CLEAR_USER_DETAILS:
      return {
        ...state,
        user: initialUser,
      };
    default:
      return state;
  }
};
