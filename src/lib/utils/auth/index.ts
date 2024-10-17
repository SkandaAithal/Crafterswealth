import {
  AuthAction,
  AuthActionTypes,
  AuthState,
} from "@/lib/types/common/user";

export const userInitialState: AuthState = {
  user: null,
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
        user: null,
      };
    default:
      return state;
  }
};
