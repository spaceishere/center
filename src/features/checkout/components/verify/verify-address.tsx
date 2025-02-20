"use client";
import { useAtomValue } from "jotai";

import {
  billTypeAtom,
  branchAtom,
  deliveryInfoAtom,
  registerNumberAtom,
} from "@/features/order/store/order";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@apollo/client";
import branches from "@/gql/branch/queries";
import { useMemo } from "react";
import { TBranch } from "@/types";

const VerifyAddress = () => {
  const {
    firstName,
    lastName,
    email,
    phone,
    city,
    district,
    street,
    detail,
    companyName,
  } = useAtomValue(deliveryInfoAtom) || {};
  const billType = useAtomValue(billTypeAtom);
  const registerNumber = useAtomValue(registerNumberAtom);
  const branchId = useAtomValue(branchAtom);

  const { data, loading } = useQuery(branches, {
    variables: {
      withoutUserFilter: true,
    },
    skip: !branchId,
  });

  const branch = useMemo(() => {
    return data?.branches?.find((item: any) => item._id === branchId) as
      | TBranch
      | undefined;
  }, [data, branchId]);

  return (
    <>
      <div className="py-6">
        <div className="mb-3 text-black/60">
          Захиалагч:{" "}
          {billType === "1" ? "Хувь хүн" : `${registerNumber} - ${companyName}`}
        </div>
        <div className="text-sm font-semibold">
          {firstName} {lastName || ""}
        </div>
        <div>
          {email} {phone}
        </div>
      </div>
      <Separator />
      <div className="py-6">
        <div className="mb-3 text-black/60">
          {branch ? "Очиж авах" : "Хүргэлтийн хаяг"}
        </div>
        {!branch && (
          <>
            <div>
              {city}, {district} дүүрэг, {street}, {detail}
            </div>
            <div className="mt-4 flex gap-4">
              <Badge
                variant="secondary"
                className="px-4 py-1.5 text-sm font-medium"
              >
                {firstName} {lastName}
              </Badge>
              <Badge
                variant="secondary"
                className="px-4 py-1.5 text-sm font-medium"
              >
                {phone}
              </Badge>
            </div>
          </>
        )}
        {branchId && !loading && data && (
          <>
            <div className="pb-2">{branch?.title}</div>
            <p className="text-muted-foreground">{branch?.address}</p>
            <div className="mt-4 flex gap-4">
              <Badge
                variant="secondary"
                className="px-4 py-1.5 text-sm font-medium"
              >
                {firstName} {lastName}
              </Badge>
              <Badge
                variant="secondary"
                className="px-4 py-1.5 text-sm font-medium"
              >
                {phone}
              </Badge>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default VerifyAddress;
