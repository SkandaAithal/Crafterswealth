import {
  AuthAction,
  AuthActionTypes,
  AuthState,
} from "@/lib/types/common/user";

export const initialUser = {
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
};

export const userInitialState: AuthState = {
  user: initialUser,
  isAuthLoading: false,
};

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.IS_AUTH_LOADING:
      return {
        ...state,
        isAuthLoading: action.payload,
      };

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
