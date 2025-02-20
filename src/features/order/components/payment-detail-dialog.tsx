import { useAtom } from "jotai";
import { useMediaQuery } from "@/hooks/use-media-query";
import { openDetailAtom } from "@/features/order/store/payment";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import PaymentDetail from "./payment-detail";

const PaymentDetailDialog = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useAtom(openDetailAtom);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl sm:rounded-2xl">
          <PaymentDetail />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="p-4 pt-0">
        <PaymentDetail />
      </DrawerContent>
    </Drawer>
  );
};

export default PaymentDetailDialog;
