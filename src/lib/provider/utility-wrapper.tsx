import React, { ReactNode, useEffect } from "react";
import { useApp } from "./app-provider";
import usePlaceOrder from "../hooks/use-place-order";

const UtilityWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { triggerInvoice } = useApp();
  const { completeOrderPlacementFlow } = usePlaceOrder();
  useEffect(() => {
    if (triggerInvoice) {
      completeOrderPlacementFlow();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerInvoice]);
  return children;
};

export default UtilityWrapper;
