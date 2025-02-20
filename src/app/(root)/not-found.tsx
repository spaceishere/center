import Link from "next/link";
import Image from "next/image";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="relative h-full min-h-[550px] w-full flex-1">
      <Image
        fill
        src={"/assets/not-found-bg.svg"}
        alt="Not Found Bg"
        className="z-[-1] object-cover object-center"
        draggable={false}
      />

      <Container className="z-10 flex flex-col items-center justify-center gap-x-5 gap-y-20 sm:px-10 md:flex-row md:px-24 lg:px-32">
        <div className="w-full space-y-5 md:min-w-[278px] lg:min-w-[374px] xl:min-w-[502px]">
          <div className="space-y-4">
            <p className="text-[42px] font-bold text-black">Oops...</p>
            <p className="text-[32px] text-black lg:text-[35px]">
              Энэ хуудас олдсонгүй!
            </p>
          </div>

          <p className="text-gray-700">
            Та нүүр хуудас руу буцахыг хүсвэл буцах товчин дээр дарна уу.
          </p>

          <Button asChild className="h-[45px] w-[170px] md:mt-5">
            <Link href="/">Буцах</Link>
          </Button>
        </div>

        <div className="relative aspect-[3/2] w-full">
          <Image
            fill
            src={"/assets/not-found-banner.svg"}
            alt="Not Found Banner"
            className="object-contain object-center"
            draggable={false}
          />
        </div>
      </Container>
    </div>
  );
};

export default NotFound;
