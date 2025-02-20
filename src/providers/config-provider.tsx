"use client";

import { configAtom } from "@/features/auth/store/auth";
import { TConfig } from "@/types";
import { useSetAtom } from "jotai";
import { useLayoutEffect } from "react";

export const ConfigProvider = ({
  children,
  config,
}: React.PropsWithChildren & { config: TConfig }) => {
  const setConfig = useSetAtom(configAtom);
  const { deliveryConfig, erxesAppToken, paymentIds, name, isCheckRemainder } =
    config || {};

  useLayoutEffect(() => {
    setConfig({
      deliveryConfig,
      erxesAppToken,
      paymentIds,
      name,
      isCheckRemainder,
    });
  }, []);

  return <>{children}</>;
};
