"use client";

import { useOrderCUD } from "@/features/order/api/order";
import { useCurrentOrder } from "@/features/order/api/order";

export const DirectHooks = () => {
  useCurrentOrder();
  useOrderCUD();

  return null;
};
