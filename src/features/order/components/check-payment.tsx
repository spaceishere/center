import { toast } from "sonner";
import { useCheckInvoice } from "@/features/order/api/payment";

import { getLabel } from "../constant";

import { Button } from "@/components/ui/button";
import { LoadingIcon } from "@/components/ui/loading";

const CheckPayment = ({ id, disabled }: { id: string; disabled?: boolean }) => {
  const { checkInvoice, loading } = useCheckInvoice();

  return (
    <Button
      size="lg"
      className="absolute bottom-1 left-0 w-full flex-1"
      disabled={disabled || loading}
      onClick={() =>
        checkInvoice({
          variables: { _id: id },
          onCompleted({ invoicesCheck }) {
            toast.info(getLabel(invoicesCheck));
          },
        })
      }
    >
      {loading && <LoadingIcon />}
      Төлбөр шалгах
    </Button>
  );
};

export default CheckPayment;
