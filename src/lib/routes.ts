export const HOME = "/";
export const CONTACT = "/contact";
export const PRODUCTS = "/products";
export const ARTICLES = "/articles";
export const ABOUT_US = "/about-us";
export const PRIVACY_POLICY = "/privacy-policy";
export const TERMS_AND_CONDITION = "/terms-conditions";
export const PLAN = "/plan";
export const PRODUCTS_DETAIL = `${PRODUCTS}/details`;
export const ACCOMPLISHMENTS = "/accomplishments";
export const MY_PAPERS = `${PRODUCTS}/my-papers`;
export const LOGIN_PAGE = "/login";
export const SINGN_UP_PAGE = "/signup";
export const FORGOT_PASSWORD_PAGE = "/forgot-password";
export const CART = "/cart";
export const CHECKOUT = "/checkout";
export const PAYMENT_SUCCESS = "/payment/success";
export const PAYMENT_FAILURE = "/payment/failure";
export const DISCLAIMER = "/disclaimer";
export const REFUND_POLICY = "/refund-policy";
export const DISCLOSURE = "/disclosure";
export const GRIEVANCES = "/grievances";
export const PAGES_TO_HIDE_FOOTER = [
  LOGIN_PAGE,
  SINGN_UP_PAGE,
  FORGOT_PASSWORD_PAGE,
  PAYMENT_SUCCESS,
  PAYMENT_FAILURE,
  DISCLAIMER,
];

export const PAGES_TO_HIDE_HEADER = [PAYMENT_SUCCESS];

// api routes
export const GET_STOCKS_API = "/api/stocks";
export const POST_STATUS_API = "/api/status";
export const GET_ACHIEVEMENT_API = "/api/achievement";
export const INVOICE_API = "/api/invoice";
export const UPLOAD_INVOICE_API = "/api/uploadpdf";
export const NEWSLETTER_API = "/api/newsletter";
export const ORDERS_SHEET_API = "/api/order-sheet";
export const COMPLAINTS_API = "/api/complaints";
export const MAILCHIMP_TAGS_API = "/api/mailchimp-tags";
export const PHONE_PE_API = "/api/phonepe";

//protected routes
export const PROTECTED_ROUTES = [
  MY_PAPERS,
  PLAN,
  CART,
  CHECKOUT,
  PAYMENT_SUCCESS,
  PAYMENT_FAILURE,
];

export const PAGE_MAP = {
  [HOME]: "Home Page",
  [CONTACT]: "Contact Page",
  [PRODUCTS]: "Products Page",
  [ARTICLES]: "Articles Page",
  [ABOUT_US]: "About Us Page",
  [PRIVACY_POLICY]: "Privacy Policy Page",
  [TERMS_AND_CONDITION]: "Terms and Conditions Page",
  [PLAN]: "Plan Page",
  [PRODUCTS_DETAIL]: "Product Details Page",
  [ACCOMPLISHMENTS]: "Accomplishments Page",
  [MY_PAPERS]: "My Papers Page",
  [LOGIN_PAGE]: "Login Page",
  [SINGN_UP_PAGE]: "Signup Page",
  [FORGOT_PASSWORD_PAGE]: "Forgot Password Page",
  [CART]: "Cart Page",
  [CHECKOUT]: "Checkout Page",
  [PAYMENT_SUCCESS]: "Payment Success Page",
  [PAYMENT_FAILURE]: "Payment Failure Page",
  [DISCLAIMER]: "Disclaimer Page",
  [REFUND_POLICY]: "Refund Policy Page",
  [DISCLOSURE]: "Disclosure Page",
  [GRIEVANCES]: "Grievances Page",
};
