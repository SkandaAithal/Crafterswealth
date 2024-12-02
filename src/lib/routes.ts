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
export const PAGES_TO_HIDE_FOOTER = [
  LOGIN_PAGE,
  SINGN_UP_PAGE,
  FORGOT_PASSWORD_PAGE,
  PAYMENT_SUCCESS,
  PAYMENT_FAILURE,
];

export const PAGES_TO_HIDE_HEADER = [PAYMENT_SUCCESS];

// api routes
export const GET_STOCKS_API = "/api/stocks";
export const POST_STATUS_API = "/api/status";
export const GET_ACHIEVEMENT_API = "/api/achievement";
export const INVOICE_API = "/api/invoice";
export const INVOICE_NUMBER_API = "/api/invoice-number";
export const NEWSLETTER_API = "/api/newsletter";

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
  [CART]: "Cart Page",
  [CHECKOUT]: "Checkout Page",
};
