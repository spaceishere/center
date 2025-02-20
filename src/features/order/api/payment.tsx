import { useAtomValue, useSetAtom } from "jotai";
import { OperationVariables, useMutation, useQuery } from "@apollo/client";
import { mutations, queries } from "@/gql/payment";
import { invoiceDetailAtom } from "@/features/order/store/payment";
import { configAtom } from "@/features/auth/store/auth";
import { onError } from "@/lib/utils";

import { TPayment } from "../types";
import { useDetail } from "@/features/order/components/order-detail-context";
import { useOrigin } from "@/hooks/use-origin";

const usePaymentConfig = (onCompleted?: (data: any) => void) => {
  const config = useAtomValue(configAtom);
  const { erxesAppToken, paymentIds, name } = config || {};
  const { totalAmount } = useDetail();

  const { data, loading } = useQuery(queries.payments, {
    context: {
      headers: {
        "erxes-app-token": erxesAppToken,
      },
    },
    nextFetchPolicy: "cache-first",
    skip: !erxesAppToken,
    onCompleted,
  });

  const { paymentsPublic: payments } = data || {};

  const selectedPayments: TPayment[] = (payments || []).filter(
    (payment: TPayment) =>
      paymentIds?.includes(payment._id) &&
      (totalAmount < 100000 ? payment.kind !== "storepay" : true),
  );

  return {
    loading,
    payments: selectedPayments,
    name,
    erxesAppToken,
  };
};

const useCreateInvoice = ({
  appToken,
  posName,
}: {
  appToken: string;
  posName: string;
}) => {
  const origin = useOrigin();

  const context = {
    headers: {
      "erxes-app-token": appToken,
    },
  };
  const { paymentIds } = useAtomValue(configAtom) || {};
  const { totalAmount, _id, customerId, customerType, number, deliveryInfo } =
    useDetail();
  const setInvoice = useSetAtom(invoiceDetailAtom);

  const [createInvoice, { reset, data, loading }] = useMutation(
    mutations.createInvoice,
    {
      onCompleted(data) {
        setInvoice(data?.invoiceCreate);
      },
      context,
      onError,
    },
  );

  const handleCreateInvoice = (variables?: OperationVariables) => {
    createInvoice({
      variables: {
        amount: totalAmount,
        contentType: "pos:orders",
        contentTypeId: _id,
        customerId: customerId || "empty",
        customerType: customerType || "customer",
        description: `${number} - ${posName.toUpperCase()} - ${_id}`,
        data: { posToken: process.env.NEXT_PUBLIC_POS_TOKEN },
        paymentIds,
        phone: deliveryInfo?.phone,
        redirectUri: `${origin}/invoice/success`,
        ...variables,
      },
    });
  };

  const { invoiceCreate } = data || {};

  return { loading, reset, data: invoiceCreate, handleCreateInvoice };
};

const useCheckInvoice = () => {
  const [checkInvoice, { data, loading }] = useMutation(mutations.checkInvoice);

  const { invoiceCheck } = data || {};

  return { loading, checkInvoice, status: invoiceCheck };
};

export { usePaymentConfig, useCreateInvoice, useCheckInvoice };
