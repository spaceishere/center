import { Button } from "@/components/ui/button";
import PaymentMethods from "./payment-methods-dialog";
import PaymentDetail from "./payment-detail-dialog";
import { useAtomValue, useSetAtom } from "jotai";
import {
  handleCompleteAtom,
  invoiceDetailAtom,
  openDetailAtom,
  openMethodsAtom,
  selectedMethodAtom,
} from "@/features/order/store/payment";
import { useSubscription } from "@apollo/client";
import subscriptions from "@/gql/payment/subscriptions";
import Success from "./success";

const BuyButton = () => {
  const setOpenMethods = useSetAtom(openMethodsAtom);
  const setOpenDetails = useSetAtom(openDetailAtom);
  const selectedMethod = useAtomValue(selectedMethodAtom);
  const onCompleted = useSetAtom(handleCompleteAtom);
  const { _id } = useAtomValue(invoiceDetailAtom) || {};

  const handlePay = () => {
    if (selectedMethod) return setOpenDetails(true);
    setOpenMethods(true);
  };

  useSubscription(subscriptions.invoice, {
    variables: { invoiceId: _id },
    skip: !_id,
    onData(options) {
      const { invoiceUpdated } = options.data.data || {};
      if (invoiceUpdated?.status === "paid") {
        onCompleted();
      }
    },
  });

  return (
    <>
      <Button size="lg" className="md:h-12 md:px-8" onClick={handlePay}>
        Төлбөр төлөх
      </Button>
      <PaymentMethods />
      <PaymentDetail />
      <Success />
    </>
  );
};

export default BuyButton;
