import { memo } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "@/components/image";
import { RadioGroupItem } from "@/components/ui/radio-group";

export interface IPaymentOption {
  _id: string;
  name: string;
  kind: string;
}

const PaymentType = ({
  selected,
  _id,
  kind,
}: IPaymentOption & { selected: boolean }) => {
  return (
    <div className="relative">
      <Button
        variant="outline"
        className={cn(
          "group relative h-auto w-full flex-col items-center gap-1 rounded-2xl border-2 border-border/10 pb-4 pl-6 pt-5 shadow-md transition-colors duration-100 ease-in md:items-start",
          selected && "border-primary bg-primary/10  hover:bg-primary/10",
        )}
        asChild
      >
        <div>
          <RadioGroupItem
            value={_id}
            id={_id}
            className={cn(
              "absolute right-5 top-5 hidden h-5 w-5 border-2 shadow-none md:inline-flex",
              selected && "border-primary",
            )}
          />

          <Image
            src={`/assets/payments/${kind}.png`}
            alt={kind}
            className="mb-0.5 rounded-lg object-contain"
            height={36}
            width={36}
          />
          <div className="flex-auto text-left">
            <div className={"font-medium capitalize text-black"}>
              {kind === "qpayQuickqr" ? "qpay" : kind}
            </div>
          </div>
          <label
            className={cn("absolute inset-0 cursor-pointer rounded-2xl")}
            htmlFor={_id}
          />
        </div>
      </Button>
    </div>
  );
};

export default memo(PaymentType);
