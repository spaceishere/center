import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  refetchOrderDetailAtom,
  showSuccessAtom,
} from "@/features/order/store/payment";
import { useAtom, useSetAtom } from "jotai";
import { CheckIcon } from "lucide-react";

const Success = () => {
  const setRefetch = useSetAtom(refetchOrderDetailAtom);
  const [showSuccess, setShowSuccess] = useAtom(showSuccessAtom);

  return (
    <Dialog open={showSuccess}>
      <DialogContent>
        <div className="flex flex-col items-center py-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-200">
            <CheckIcon
              className="h-10 w-10 stroke-green-700"
              strokeWidth={2.5}
            />
          </div>
          <div className="pt-6 text-center font-bold text-neutral-700 md:text-xl">
            Таны төлбөр амжилттай төлөгдлөө
          </div>
          <div className="pt-2 text-center font-medium text-neutral-500">
            Манайхаар үйлчлүүлсэн танд баярлалаа.
          </div>
          <Button
            className="mt-4 px-12"
            variant="outline"
            size="lg"
            onClick={() => {
              setRefetch(true);
              setShowSuccess(false);
            }}
          >
            Дуусгах
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Success;
