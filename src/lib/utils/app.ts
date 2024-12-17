import { produce } from "immer";
import { AppAction, AppActionTypes, AppState } from "../types/common/app";
import { OrderStatus } from "../types/checkout";

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
  coupons: [],
  order: {
    total: "",
    orderNumber: "",
    status: OrderStatus.PENDING,
    subtotal: "",
  },
};

export const invoiceInitialState = {
  invoiceData: {
    invoiceMetadata: {
      invoiceNumber: "",
      invoiceDate: "",
      paymentMethod: "",
    },
    buyerDetails: {
      name: "",
      email: "",
      phone: "",
      address: {
        area: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      },
    },
    orderDetails: {
      orderNumber: "",
      orderDate: "",
      placeOfSupply: "",
    },
    items: [],
    taxDetails: {
      isWithinState: false,
      sgst: 0,
      cgst: 0,
      igst: 0,
      totalTax: 0,
      amountInWords: "",
    },
    coupons: [],
    totals: {
      subtotal: 0,
      grandTotal: 0,
      amountInWords: "",
    },
  },
  invoiceNumber: "",
  pdfLink: "",
};

export const initialState: AppState = {
  products: [],
  verifyEmail: verifyEmailInitialState,
  forgotPassword: forgotPasswordInitialState,
  payment: paymentInitialState,
  countries: [],
  achievements: {},
  invoice: invoiceInitialState,
  categories: [],
  triggerInvoice: false,
};

export const appReducer = (state: AppState, action: AppAction): AppState => {
  return produce(state, (draft) => {
    switch (action.type) {
      case AppActionTypes.ADD_PRODUCT:
        draft.products = action.payload.products;
        draft.categories = action.payload.categories;
        break;

      case AppActionTypes.ADD_CATEGORIES:
        draft.categories = action.payload;
        break;

      case AppActionTypes.SET_COUNTRIES:
        draft.countries = action.payload;
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

      case AppActionTypes.SET_COUPONCODE:
        draft.payment.coupons = action.payload;
        break;

      case AppActionTypes.INITIATE_PAYMENT:
        draft.payment.orderId = action.payload.orderId;
        draft.payment.transactionId = action.payload.transactionId;
        draft.payment.order = action.payload.order;
        break;

      case AppActionTypes.CLEAR_ORDER:
        draft.payment = paymentInitialState;
        draft.invoice = invoiceInitialState;
        draft.triggerInvoice = false;
        break;

      case AppActionTypes.SET_INVOICE_NUMBER:
        draft.invoice.invoiceNumber = action.payload.invoiceNumber;
        draft.invoice.invoiceData = action.payload.invoiceData;
        break;
      case AppActionTypes.SET_PDF_LINK:
        draft.invoice.pdfLink = action.payload;
        break;
      case AppActionTypes.TRIGGER_INVOICE:
        draft.triggerInvoice = true;
        break;

      case AppActionTypes.SET_ACHIEVEMENTS:
        draft.achievements = action.payload;
        break;
      default:
        break;
    }
  });
};
