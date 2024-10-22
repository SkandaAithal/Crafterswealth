export const HOME = "/";
export const CONTACT = "/contact";
export const PRODUCTS = "/products";
export const ARTICLES = "/articles";
export const ABOUT_US = "/about-us";
export const PRIVACY_POLICY = "/privacy-policy";
export const TERMS_AND_CONDITION = "/terms-conditions";
export const PLAN = "/plan";
export const PRODUCTS_DETAIL = `${PRODUCTS}/details`;
export const ACCOMPLISHMENTS = "/accomplishment";
export const MY_PAPERS = `${PRODUCTS}/my-papers`;
export const LOGIN_PAGE = "/login";
export const SINGN_UP_PAGE = "/signup";
export const FORGOT_PASSWORD_PAGE = "/forgot-password";
export const CART = "/cart";
export const CHECKOUT = "/checkout";
export const PAGES_TO_HIDE_FOOTER = [
  LOGIN_PAGE,
  SINGN_UP_PAGE,
  FORGOT_PASSWORD_PAGE,
];

// api routes
export const GET_STOCKS_API = "/api/stocks";

//protected routes
export const PROTECTED_ROUTES = [MY_PAPERS, PLAN, CART, CHECKOUT];
