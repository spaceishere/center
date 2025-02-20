"use client";

import { Fragment } from "react";
import AddressForm from "@/features/checkout/components/address-form/address-form";
import { CheckoutHeader } from "@/features/checkout/components/checkout-header";

const CheckoutPage = () => {
  return (
    <Fragment>
      <CheckoutHeader title="Захиалга" backTitle="Буцах" backUrl="/cart" />
      <AddressForm />
    </Fragment>
  );
};

export default CheckoutPage;
