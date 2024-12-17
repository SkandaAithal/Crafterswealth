import { InvoiceData, OrderStatus } from "../checkout";
import { AllProducts, ProductCategory, ProductNode } from "../products";

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
  latestProducts: Record<string, AllProducts>;
  countries: CountriesTypes[];
  isAchievementsLoading: boolean;
  achievements: AchievementsData;
  invoice: InvoiceState;
  triggerInvoice: boolean;
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

export interface Order {
  total: string;
  orderNumber: string;
  status: OrderStatus;
  subtotal: string;
}
export interface PaymentContext {
  orderId: number;
  transactionId: string;
  order: Order;
  coupons: string[];
}

export interface CountriesTypes {
  name: string;
  code: string;
  flag: string;
  geoNameId: number;
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

export interface InvoiceState {
  invoiceNumber: string;
  invoiceData: InvoiceData;
  pdfLink: string;
}
export interface AppState {
  products: ProductNode[];
  verifyEmail: VerifyEmail;
  forgotPassword: ForgotPasswordContext;
  payment: PaymentContext;
  countries: CountriesTypes[];
  achievements: AchievementsData;
  invoice: InvoiceState;
  categories: ProductCategory[];
  triggerInvoice: boolean;
}
export enum AppActionTypes {
  ADD_PRODUCT = "ADD_PRODUCT",
  ADD_CATEGORIES = "ADD_CATEGORIES",
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
  SET_COUPONCODE = "SET_COUPONCODE",
  CLEAR_ORDER = "CLEAR_ORDER",
  SET_COUNTRIES = "SET_COUNTRIES",
  SET_ACHIEVEMENTS = "SET_ACHIEVEMENTS",
  SET_INVOICE_NUMBER = "SET_INVOICE_NUMBER",
  SET_PDF_LINK = "SET_PDF_LINK",
  TRIGGER_INVOICE = "TRIGGER_INVOICE",
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
      payload: { products: ProductNode[]; categories: ProductCategory[] };
    }
  | {
      type: AppActionTypes.ADD_CATEGORIES;
      payload: ProductCategory[];
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
      type: AppActionTypes.SET_INVOICE_NUMBER;
      payload: { invoiceNumber: string; invoiceData: InvoiceData };
    }
  | {
      type: AppActionTypes.SET_PDF_LINK;
      payload: string;
    }
  | {
      type: AppActionTypes.INITIATE_PAYMENT;
      payload: Omit<PaymentContext, "coupons">;
    }
  | {
      type: AppActionTypes.SET_COUPONCODE;
      payload: string[];
    }
  | {
      type: AppActionTypes.TRIGGER_INVOICE;
    }
  | {
      type: AppActionTypes.CLEAR_ORDER;
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
