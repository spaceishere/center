import { useEffect } from "react";
import { usePaymentConfig } from "@/features/order/api/payment";
import { RadioGroup } from "@/components/ui/radio-group";
import PaymentType from "./payment-type";
import { Loading } from "@/components/ui/loading";
import { useAtom, useAtomValue } from "jotai";
import {
  handleMethodAtom,
  invoiceDetailAtom,
} from "@/features/order/store/payment";
import { useCreateInvoice } from "@/features/order/api/payment";
import { configAtom } from "@/features/auth/store/auth";
import { useDetail } from "@/features/order/components/order-detail-context";

const PaymentMethods = () => {
  const { erxesAppToken, name } = useAtomValue(configAtom) || {};
  const { _id, totalAmount } = useDetail();
  const { contentTypeId } = useAtomValue(invoiceDetailAtom) || {};
  const {
    handleCreateInvoice,
    loading: creatingInvoice,
    data,
  } = useCreateInvoice({
    appToken: erxesAppToken || "",
    posName: name || "",
  });
  const { loading, payments } = usePaymentConfig(
    () => _id !== contentTypeId && handleCreateInvoice(),
  );
  const [selectedPayment, setSelectedPayment] = useAtom(handleMethodAtom);

  useEffect(() => {
    if (payments.length === 1 && !creatingInvoice && data?._id) {
      setSelectedPayment(payments[0]._id);
    }
  }, [payments, creatingInvoice, data?._id]);

  return (
    <>
      <h2 className="mb-4 font-medium text-black/80 md:text-lg">
        Төлбөрийн төрлөө сонгоно уу
      </h2>
      {loading || creatingInvoice ? (
        <Loading className="pt-32" />
      ) : (
        <RadioGroup
          value={selectedPayment}
          onValueChange={(value) => setSelectedPayment(value)}
        >
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {payments.map(({ kind, _id, name }) => (
                <PaymentType
                  selected={selectedPayment === kind}
                  kind={kind}
                  _id={_id}
                  name={name}
                  key={_id}
                />
              ))}
            </div>
          </div>
        </RadioGroup>
      )}
    </>
  );
};

export default PaymentMethods;
