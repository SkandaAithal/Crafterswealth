import { ProductCategory, ProductNode } from "../products";

export interface AppContextProps {
  appDispatch: React.Dispatch<AppAction>;
  products: ProductNode[];
  verifyEmail: VerifyEmail;
  isMounted: boolean;
  forgotPassword: ForgotPasswordContext;
  payment: PaymentContext;
  isAppLoading: boolean;
  categories: ProductCategory[];
  boughtObject: Record<string, string[]>;
  allProducts: Record<string, string[]>;
  countries: CountriesTypes[];
  isAchievementsLoading: boolean;
  achievements: AchievementsData;
}

export interface VerifyEmail {
  isModalOpen: boolean;
  email: string;
  verificationCode: string;
  expire: number;
}
export interface Step1 {
  email: string;
  completed: boolean;
}

export interface Step2 {
  completed: boolean;
  expire: number;
  verificationCode: string;
}
export interface ForgotPasswordContext {
  step1: Step1;
  step2: Step2;
  step3: Omit<Step1, "email">;
}

export interface PaymentContext {
  orderId: number;
  transactionId: string;
}

export interface CountriesTypes {
  name: string;
  code: string;
  flag: string;
}

export interface Achievement {
  "Pur. Price": string;
  "Target Price": string;
  "Days Held": string;
  "Stock Name": string;
  PdfLink: string;
  "Product Name": string;
  Profit: string;
}

export interface AchievementsData {
  [key: string]: Achievement[];
}

export interface AppState {
  products: ProductNode[];
  verifyEmail: VerifyEmail;
  forgotPassword: ForgotPasswordContext;
  payment: PaymentContext;
  countries: CountriesTypes[];
  achievements: AchievementsData;
}
export enum AppActionTypes {
  ADD_PRODUCT = "ADD_PRODUCT",
  TOGGLE_VERIFY_EMAIL_MODAL = "TOGGLE_VERIFY_EMAIL_MODAL",
  SEND_EMAIL = "SEND_EMAIL",
  SET_EMAIL = "SET_EMAIL",
  SET_TO_DEFAULT = "SET_TO_DEFAULT",
  FORGOT_PASSWORD_STEP_1 = "FORGOT_PASSWORD_STEP_1",
  FORGOT_PASSWORD_STEP_2 = "FORGOT_PASSWORD_STEP_2",
  FORGOT_PASSWORD_STEP_2_COMPLETE = "FORGOT_PASSWORD_STEP_2_COMPLETE",
  FORGOT_PASSWORD_STEP_3 = "FORGOT_PASSWORD_STEP_3",
  SET_FORGOT_PASSWORD_DEFAULT = "SET_FORGOT_PASSWORD_DEFAULT",
  INITIATE_PAYMENT = "INITIATE_PAYMENT",
  CLEAR_PAYMENT = "CLEAR_PAYMENT",
  SET_COUNTRIES = "SET_COUNTRIES",
  SET_ACHIEVEMENTS = "SET_ACHIEVEMENTS",
}
export type AppAction =
  | {
      type: AppActionTypes.TOGGLE_VERIFY_EMAIL_MODAL;
      payload: boolean;
    }
  | {
      type: AppActionTypes.SEND_EMAIL;
      payload: Omit<VerifyEmail, "isModalOpen">;
    }
  | {
      type: AppActionTypes.SET_EMAIL;
      payload: string;
    }
  | {
      type: AppActionTypes.SET_TO_DEFAULT;
    }
  | {
      type: AppActionTypes.FORGOT_PASSWORD_STEP_1;
      payload: string;
    }
  | {
      type: AppActionTypes.FORGOT_PASSWORD_STEP_2;
      payload: Omit<VerifyEmail, "isModalOpen" | "email">;
    }
  | {
      type: AppActionTypes.FORGOT_PASSWORD_STEP_2_COMPLETE;
    }
  | {
      type: AppActionTypes.FORGOT_PASSWORD_STEP_3;
    }
  | {
      type: AppActionTypes.SET_FORGOT_PASSWORD_DEFAULT;
    }
  | {
      type: AppActionTypes.ADD_PRODUCT;
      payload: ProductNode[];
    }
  | {
      type: AppActionTypes.SET_COUNTRIES;
      payload: CountriesTypes[];
    }
  | {
      type: AppActionTypes.SET_ACHIEVEMENTS;
      payload: AchievementsData;
    }
  | {
      type: AppActionTypes.INITIATE_PAYMENT;
      payload: PaymentContext;
    }
  | {
      type: AppActionTypes.CLEAR_PAYMENT;
    };

export interface SendVerificationEmailArgs {
  appDispatch: React.Dispatch<AppAction>;
  email: string;
  expire: number;
  setIsVerifyEmailLoading: React.Dispatch<boolean>;
}

export interface SubscribeToNewsLetterFormData {
  email: string;
}
