import { produce } from "immer";
import { AppAction, AppActionTypes, AppState } from "../types/common/app";

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
  return produce(state, (draft) => {
    switch (action.type) {
      case AppActionTypes.ADD_PRODUCT:
        draft.products = action.payload;
        break;

      case AppActionTypes.TOGGLE_VERIFY_EMAIL_MODAL:
        draft.verifyEmail.isModalOpen = action.payload;
        break;

      case AppActionTypes.SEND_EMAIL:
        Object.assign(draft.verifyEmail, action.payload);
        break;

      case AppActionTypes.SET_EMAIL:
        draft.verifyEmail.email = action.payload;
        break;

      case AppActionTypes.SET_TO_DEFAULT:
        draft.verifyEmail = verifyEmailInitialState;
        break;

      case AppActionTypes.FORGOT_PASSWORD_STEP_1:
        draft.forgotPassword.step1 = {
          email: action.payload,
          completed: true,
        };
        break;

      case AppActionTypes.FORGOT_PASSWORD_STEP_2:
        Object.assign(draft.forgotPassword.step2, action.payload);
        break;

      case AppActionTypes.FORGOT_PASSWORD_STEP_2_COMPLETE:
        draft.forgotPassword.step2 = {
          completed: true,
          expire: 0,
          verificationCode: "",
        };
        break;

      case AppActionTypes.FORGOT_PASSWORD_STEP_3:
        draft.forgotPassword.step3.completed = true;
        break;

      case AppActionTypes.SET_FORGOT_PASSWORD_DEFAULT:
        draft.forgotPassword = forgotPasswordInitialState;
        break;

      case AppActionTypes.INITIATE_PAYMENT:
        draft.payment = action.payload;
        break;

      case AppActionTypes.CLEAR_PAYMENT:
        draft.payment = paymentInitialState;
        break;

      default:
        break;
    }
  });
};
