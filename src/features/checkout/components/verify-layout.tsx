"use client";

import Link from "next/link";

import { useAtomValue } from "jotai";
import { descriptionAtom } from "@/features/order/store/order";

import { Button } from "@/components/ui/button";

import { ArrowLeftIcon, MapPinOffIcon } from "lucide-react";

const VerifyLayout = ({ children }: React.PropsWithChildren) => {
  const description = useAtomValue(descriptionAtom);

  if (!description)
    return (
      <div className="col-span-12 flex flex-col items-center justify-center pb-32 pt-24">
        <MapPinOffIcon className="h-12 w-12" strokeWidth={1.3} />
        <h2 className="mt-8 text-xl font-bold sm:text-2xl">Хаяг хоосон</h2>
        <Button variant="secondary" className="mt-4" asChild>
          <Link href={"/address"}>
            <ArrowLeftIcon className="mr-2 h-5 w-5" />
            Хаяг оруулах
          </Link>
        </Button>
      </div>
    );

  return <>{children}</>;
};

export default VerifyLayout;
