import { AppAction, AppActionTypes, AppState } from "../types/app";

export const verifyEmailInitialState = {
  isModalOpen: false,
  email: "",
  verificationCode: "",
  expire: 0,
};

export const forgotPasswordInitialState = {
  step1: { email: "", completed: false },
  step2: { completed: false, expire: 0, verificationCode: "" },
  step3: { completed: false },
};

export const paymentInitialState = {
  orderId: 0,
  transactionId: "",
};

export const initialState: AppState = {
  products: [],
  verifyEmail: verifyEmailInitialState,
  forgotPassword: forgotPasswordInitialState,
  payment: paymentInitialState,
};

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case AppActionTypes.ADD_PRODUCT:
      return { ...state, products: action.payload };

    case AppActionTypes.TOGGLE_VERIFY_EMAIL_MODAL:
      return {
        ...state,
        verifyEmail: {
          ...state.verifyEmail,
          isModalOpen: action.payload,
        },
      };

    case AppActionTypes.SEND_EMAIL:
      return {
        ...state,
        verifyEmail: {
          ...state.verifyEmail,
          ...action.payload,
        },
      };

    case AppActionTypes.SET_EMAIL:
      return {
        ...state,
        verifyEmail: {
          ...state.verifyEmail,
          email: action.payload,
        },
      };

    case AppActionTypes.SET_TO_DEFAULT:
      return {
        ...state,
        verifyEmail: {
          ...action.payload,
        },
      };

    case AppActionTypes.FORGOT_PASSWORD_STEP_1:
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          step1: {
            email: action.payload,
            completed: true,
          },
        },
      };

    case AppActionTypes.FORGOT_PASSWORD_STEP_2:
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          step2: {
            ...state.forgotPassword.step2,
            ...action.payload,
          },
        },
      };

    case AppActionTypes.FORGOT_PASSWORD_STEP_2_COMPLETE:
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          step2: {
            completed: true,
            expire: 0,
            verificationCode: "",
          },
        },
      };
    case AppActionTypes.FORGOT_PASSWORD_STEP_3:
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          step3: {
            completed: true,
          },
        },
      };
    case AppActionTypes.SET_FORGOT_PASSWORD_DEFAULT:
      return {
        ...state,
        forgotPassword: forgotPasswordInitialState,
      };

    case AppActionTypes.INITIATE_PAYMENT:
      return {
        ...state,
        payment: action.payload,
      };

    case AppActionTypes.CLEAR_PAYMENT:
      return {
        ...state,
        payment: paymentInitialState,
      };
    default:
      return state;
  }
};
