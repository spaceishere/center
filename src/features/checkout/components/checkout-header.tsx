"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { ArrowLeftIcon } from "lucide-react";

interface CheckoutHeaderProps {
  title?: string;
  backTitle: string;
  backUrl: string;
}

export const CheckoutHeader = ({
  title,
  backTitle,
  backUrl,
}: CheckoutHeaderProps) => {
  return (
    <div className="my-6 flex items-center justify-between md:mb-10 md:mt-8">
      <h1 className="text-xl font-bold md:text-4xl">{title}</h1>

      <Button size="lg" variant="secondary" asChild>
        <Link href={backUrl}>
          <ArrowLeftIcon className="mr-2 h-5 w-5" />
          {backTitle}
        </Link>
      </Button>
    </div>
  );
};
