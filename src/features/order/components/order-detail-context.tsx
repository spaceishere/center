"use client";

import { TOrder } from "@/features/order/types";
import { createContext, useContext } from "react";

export const OrderDetailContext = createContext<TOrder | null>(null);

export const useDetail = () => {
  const context = useContext(OrderDetailContext);

  if (!context) {
    throw new Error("useDetail must be used within a <OrderDetail />");
  }

  return context;
};
