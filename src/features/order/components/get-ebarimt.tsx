import { Price } from "@/components/price";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useDetail } from "@/features/order/components/order-detail-context";
import { Fragment } from "react";

const GetEbarimt = () => {
  const { putResponses } = useDetail();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">И-Баримт авах</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-row items-start justify-between font-semibold">
          И-Баримт
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="-translate-y-2">
              <XIcon className="h-5 w-5" />
            </Button>
          </DialogClose>
        </DialogHeader>
        {putResponses.map((pt, index) => {
          return (
            <Fragment key={index}>
              <div className="p-4">
                <div className="relative mx-auto aspect-square max-w-80">
                  <div className="absolute inset-0 rounded-lg border"></div>
                  <div className="absolute inset-0 h-full w-full rounded-3xl bg-background">
                    {pt.qrData ? (
                      <QRCodeSVG
                        value={pt.qrData || ""}
                        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <p className="w-4/5 text-center text-sm font-medium text-muted-foreground">
                          Одоогоор И-Баримт авах боломжгүй байна
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-2 pb-4 text-sm">
                <div className="col-span-6 md:col-span-4">
                  <div className="text-xs leading-5 text-foreground/60">
                    ДДТД
                  </div>
                  <div className="font-medium leading-snug">{pt.id}</div>
                </div>
                <div className="col-span-3 md:col-span-2">
                  <div className="text-foreground/60">Харилцагч</div>
                  <div className="font-medium leading-snug">
                    {pt.customerName || pt.customerTin}
                  </div>
                </div>

                <div className="col-span-3 md:col-span-4">
                  <div className="text-foreground/60">Сугалааны дугаар</div>
                  <div className="font-medium leading-snug">{pt.lottery}</div>
                </div>
                <div className="col-span-4 md:col-span-2">
                  <div className="text-foreground/60">Бүртгүүлэх дүн</div>
                  <div className="font-medium leading-snug">
                    <Price amount={(pt.totalAmount || 0).toString()} />
                  </div>
                </div>
              </div>
            </Fragment>
          );
        })}
      </DialogContent>
    </Dialog>
  );
};

export default GetEbarimt;
