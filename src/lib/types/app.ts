import { ProductNode } from "./common/products";

export interface AppContextProps {
  appDispatch: React.Dispatch<AppAction>;
  products: ProductNode[];
}

export interface AppState {
  products: ProductNode[];
}
export enum AppActionTypes {
  ADD_PRODUCT = "ADD_PRODUCT",
}
export type AppAction = {
  type: AppActionTypes.ADD_PRODUCT;
  payload: ProductNode[];
};
