import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BanIcon, InfoIcon } from "lucide-react";
import Image from "@/components/image";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSetAtom } from "jotai";
import { handleMethodAtom } from "@/features/order/store/payment";
import BackButton from "./back-button";
import CheckPayment from "./check-payment";
import Link from "next/link";

const getName = (name: string) => {
  if (name === "Trade and Development bank") return "TDB";
  if (name === "National investment bank") return "NIB";
  if (name === "Chinggis khaan bank") return "CKHB";
  return name;
};

const QrDetail = ({
  errorDescription,
  status,
  qrCode,
  id,
  urls,
}: {
  errorDescription?: string;
  status: string;
  qrCode: string;
  id: string;
  urls: { name: string; logo: string; link: string }[];
}) => {
  return (
    <div className="relative">
      <div className="max-h-[60vh] overflow-auto pb-14">
        <QrContainer error={errorDescription}>
          {qrCode ? (
            <Image
              src={qrCode}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              height={256}
              width={256}
              alt=""
            />
          ) : (
            <BanIcon
              className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 text-input"
              strokeWidth={1}
            />
          )}
        </QrContainer>
        {!!urls?.length && (
          <div className="grid grid-cols-3 gap-4 pt-4 md:hidden">
            {urls.map((url) => (
              <Button
                className="flex h-auto flex-col items-center justify-center gap-1 rounded-md border border-border/10 px-2 py-3 text-xs shadow"
                variant={"ghost"}
                size="sm"
                asChild
                key={url.name}
              >
                <Link href={url.link}>
                  <Image
                    src={url.logo}
                    className="block h-12 w-12 rounded-md object-contain"
                    alt=""
                    height={164}
                    width={164}
                  />
                  <span className="mt-1 h-4 overflow-hidden text-neutral-600">
                    {getName(url.name)}
                  </span>
                </Link>
              </Button>
            ))}
          </div>
        )}
        <DialogFooter className="block gap-2 space-y-2 pt-4 sm:justify-center md:flex md:space-y-0">
          <BackButton />
          <CheckPayment id={id} />
        </DialogFooter>
      </div>
    </div>
  );
};

export const QrContainer = ({
  children,
  loading,
  error,
}: React.PropsWithChildren & { loading?: boolean; error?: string }) => (
  <>
    <div className="p-4">
      <div className="relative mx-auto aspect-square max-w-80">
        <div className="absolute inset-0 rounded-lg border"></div>
        <div className="absolute inset-0 h-full w-full rounded-3xl bg-background">
          {children}
        </div>
      </div>
    </div>
    {error ? (
      <Alert variant="destructive">
        <InfoIcon className="h-4 w-4 rotate-180" />
        <AlertTitle>Алдаа гарлаа</AlertTitle>
        <AlertDescription className="text-xs">{error}</AlertDescription>
      </Alert>
    ) : (
      <Alert variant="warning">
        <InfoIcon className="h-4 w-4" />
        <AlertDescription className="text-xs">
          Төлбөр төлөгдсөний дараа таны захиалга идэвхэждэг болохыг анхаараарай!
          Та өөрийн банкны аппликейшныг ашиглан QR кодыг уншуулж төлбөр төлөх
          боломжтой
        </AlertDescription>
      </Alert>
    )}
    {loading && (
      <DialogFooter className="block gap-2 space-y-2 pt-4 sm:justify-center md:flex md:space-y-0">
        <BackButton disabled />
        <Button size="lg" className="w-full flex-1" disabled>
          Төлбөр шалгах
        </Button>
      </DialogFooter>
    )}
  </>
);

export default QrDetail;
