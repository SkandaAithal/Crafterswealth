import { AppAction, AppActionTypes, AppState } from "../types/app";

export const initialState: AppState = {
  products: [],
};

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case AppActionTypes.ADD_PRODUCT:
      return { ...state, products: [...state.products, ...action.payload] };
    default:
      return state;
  }
};
