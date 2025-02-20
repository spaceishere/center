"use client";

import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";

const ErrorPage = () => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#E2FCF6]/50">
      <Container className="relative flex h-full min-h-[550px] w-full flex-1 flex-col items-center justify-center space-y-20 sm:px-10 md:px-32 lg:px-48">
        <p className="max-w-[350px] text-center text-[30px] font-medium text-black md:text-[36px] lg:max-w-[500px] lg:text-[48px]">
          Алдаа гарсан тул та түр хүлээгээд дахин оролдоно уу
        </p>

        <div className="relative aspect-[7/3] w-full">
          <Image
            fill
            src={"/assets/error-banner.svg"}
            alt="Not Found Banner"
            className="object-contain object-center"
            draggable={false}
          />
          <Image
            fill
            src={"/assets/error-face.svg"}
            alt="Not Found Face"
            className="object-contain object-center"
            draggable={false}
          />
        </div>

        <Button asChild className="h-[45px] w-[200px] md:mt-5">
          <Link href="/">Нүүр хуудас руу буцах</Link>
        </Button>
      </Container>
    </div>
  );
};

export default ErrorPage;
