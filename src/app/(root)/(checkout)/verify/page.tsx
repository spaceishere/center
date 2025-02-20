import { Fragment } from "react";

import { Separator } from "@/components/ui/separator";
import ItemsSummary from "@/features/checkout/components/verify/items-summary";
import ItemsGrid from "@/features/checkout/components/verify/items-grid";
import VerifyAddress from "@/features/checkout/components/verify/verify-address";
import VerifyButton from "@/features/checkout/components/verify/verifyButton";
import VerifyLayout from "@/features/checkout/components/verify-layout";
import { CheckoutHeader } from "@/features/checkout/components/checkout-header";
import OrderSummary from "@/features/checkout/components/order-summary/order-summary";

const Verify = () => {
  return (
    <Fragment>
      <CheckoutHeader
        title="Баталгаажуулах"
        backTitle="Буцах"
        backUrl="/address"
      />

      <VerifyLayout>
        <div className="md:grid md:grid-cols-12 md:gap-x-6">
          <div className="col-span-7">
            <div className="text-black/60">Захиалга</div>
            <ItemsGrid />
            <Separator />
            <VerifyAddress />
          </div>
          <OrderSummary
            className="col-span-5 h-fit md:sticky md:top-20"
            content={<ItemsSummary />}
          >
            <VerifyButton />
          </OrderSummary>
        </div>
      </VerifyLayout>
    </Fragment>
  );
};

export default Verify;
