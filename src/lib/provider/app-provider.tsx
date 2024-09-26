import React, { createContext, useContext, ReactNode } from "react";
import { AppContextProps } from "../types/app";
import usePersistentReducer from "../hooks/use-persistent-reducer";
import { appReducer, initialState } from "../utils/app";
import { APP_INFO } from "../constants";

const AppContext = createContext<AppContextProps | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = usePersistentReducer(
    appReducer,
    initialState,
    APP_INFO
  );

  return (
    <AppContext.Provider
      value={{ appDispatch: dispatch, products: state.products }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextProps => {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
