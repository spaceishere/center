import { Button } from "@/components/ui/button";
import { usePaymentConfig } from "@/features/order/api/payment";
import { handleMethodAtom } from "@/features/order/store/payment";
import { useSetAtom } from "jotai";

const BackButton = ({ disabled }: { disabled?: boolean }) => {
  const handleMethod = useSetAtom(handleMethodAtom);
  const { payments } = usePaymentConfig();

  if (payments.length === 1) return null;

  return (
    <Button
      size="lg"
      variant={"outline"}
      className="w-full flex-1"
      onClick={() => handleMethod("")}
      disabled={disabled}
      type="button"
    >
      Буцах
    </Button>
  );
};

export default BackButton;
