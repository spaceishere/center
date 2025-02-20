import { DialogHeader } from "@/components/ui/dialog";
import {
  handleMethodAtom,
  invoiceDetailAtom,
} from "@/features/order/store/payment";
import { useAtomValue } from "jotai";
import Image from "@/components/image";
import { usePaymentConfig } from "@/features/order/api/payment";
import { TPayment } from "../types";
import { Loading } from "@/components/ui/loading";
import { useEffect } from "react";
import QrDetail, { QrContainer } from "./qr-detail";
import PhoneDetail from "./phone-detail";
import { Badge } from "@/components/ui/badge";
import { useMutation } from "@apollo/client";
import { mutations } from "@/gql/payment";

const QR_PAYMENTS = ["qpay", "monpay", "pocket", "qpayQuickqr"];
const PHONE_PAYMENTS = ["socialpay", "storepay"];

const PaymentDetail = () => {
  const selectedMethod = useAtomValue(handleMethodAtom);
  const invoiceDetail = useAtomValue(invoiceDetailAtom);
  const { payments, loading } = usePaymentConfig();

  const kind = payments?.find((p: TPayment) => p._id === selectedMethod)?.kind;
  const isQr = QR_PAYMENTS.includes(kind || "");
  const isPhone = PHONE_PAYMENTS.includes(kind || "");

  const [addTransaction, { loading: addingTransaction, reset, data }] =
    useMutation(mutations.addTransaction);

  useEffect(() => {
    if (selectedMethod) {
      reset();
    }
    if (!isPhone && selectedMethod) {
      addTransaction({
        variables: {
          invoiceId: invoiceDetail?._id,
          paymentId: selectedMethod,
          amount: invoiceDetail?.amount,
        },
      });
    }
  }, [selectedMethod, isPhone]);

  if (loading) return <Loading className="py-32" />;

  const { _id, status, response } = data?.paymentTransactionsAdd || {};

  return (
    <>
      <DialogHeader className="my-2 flex-row items-center justify-between gap-4 md:mt-0">
        <div className="flex items-center gap-4">
          <Image
            src={`/assets/payments/${kind}.png`}
            className="flex-none rounded-lg object-contain"
            height={36}
            width={36}
            alt="Payment Logo"
          />
          <div className="text-left">
            <div className="mb-0.5 font-medium capitalize leading-none">
              {kind}
            </div>
            <div className="md:text-md text-xs text-neutral-500">
              {isQr
                ? "Qr кодыг уншуулж төлбөрөө төлнө үү"
                : "Бүртгэлтэй утасны дугаараа оруулна уу"}
            </div>
          </div>
        </div>
        {!addingTransaction && !!status && (
          <Badge
            variant="outline"
            className="bg-yellow-100, rounded-xl border-amber-200 p-2 px-4 text-yellow-500"
          >
            {status === "pending"
              ? "Төлбөр хүлээгдэж байна"
              : "Төлөгдсөн байна"}
          </Badge>
        )}
      </DialogHeader>
      {isQr &&
        (addingTransaction ? (
          <QrContainer loading />
        ) : (
          (!!response?.qrData || (isQr && response?.error)) && (
            <QrDetail
              errorDescription={response?.error}
              status={status}
              qrCode={response?.qrData}
              urls={response?.urls}
              id={_id}
            />
          )
        ))}
      {isPhone && (
        <PhoneDetail
          kind={kind}
          loading={loading}
          handleCreate={(values) =>
            addTransaction({
              variables: {
                invoiceId: invoiceDetail?._id,
                paymentId: selectedMethod,
                amount: invoiceDetail?.amount,
                details: { phone: values?.phone },
              },
            })
          }
          data={data}
        />
      )}

      {addingTransaction && (
        <Loading className="absolute inset-0 bg-background/40" />
      )}
    </>
  );
};

export default PaymentDetail;
