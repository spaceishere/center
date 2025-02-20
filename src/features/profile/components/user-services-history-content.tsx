"use client";

import { TCustomer } from "@/types";
import { Services } from "./services";

interface Props {
  activeServices: any;
  historyServices: any;
  checkList?: boolean;
}

export const UserServicesHistoryContent = ({
  activeServices,
  historyServices,
}: Props) => {
  return (
    <div className="w-full space-y-6">
      <Services title="Идэвхтэй цаг захиалга" items={activeServices} />

      <Services title="Түүх" items={historyServices} />
    </div>
  );
};
