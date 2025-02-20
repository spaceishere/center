"use client";

import { useRouter } from "next/navigation";

import { useAtomValue } from "jotai";
import { activeOrderAtom } from "@/features/order/store/order";

import { Button } from "@/components/ui/button";
import { LoadingIcon } from "@/components/ui/loading";

import { useOrderChangeSaleStatus } from "@/features/order/api/order";

import { TOrder } from "@/features/order/types";

const VerifyButton = () => {
  const { _id } = useAtomValue(activeOrderAtom) as TOrder;
  const router = useRouter();
  const { handleConfirm, loading } = useOrderChangeSaleStatus();

  const handleClick = () =>
    handleConfirm(() => {
      router.push(`/order/${_id}`);
      router.refresh();
    });

  return (
    <Button
      size="lg"
      className="w-full"
      disabled={loading}
      onClick={handleClick}
    >
      {loading && <LoadingIcon />}
      Төлбөр төлөх
    </Button>
  );
};

export default VerifyButton;
