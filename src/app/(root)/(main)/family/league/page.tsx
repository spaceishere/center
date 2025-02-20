import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionTitle } from "@/components/section-title";
import { Button } from "@/components/ui/button";
import {
  OurChamps,
  OurChampsSkeleton,
} from "@/features/family/components/our-champs";
import { Culture } from "@/features/family/components/culture";

const LeaguePage = () => {
  return (
    <div className="w-full">
      <SectionTitle
        title={[
          "Хайбрид",
          " автомашины сэтгэл амар байх нөхцлийг бид бий болгоно.",
        ]}
        className="mx-auto max-w-[1000px] pb-2 lg:text-[45px] lg:leading-[50px]"
      />

      <p className="w-full pb-6 text-center text-muted-foreground">
        Приус центр нэрээрээ танил болсон манай компани нь анх үйл ажиллагаагаа
        2008 оноос автомашины импорт худалдааны чиглэлээр эхэлсэн бөгөөд 2011
        оны 8 сарын 10-ний өдөр Цукуба ХХК болж албан ёсны үйл ажиллагаат
        компани болсон түүхтэй.
      </p>
      <div className="relative mb-6 aspect-[2/1] w-full">
        <Image
          src={"/assets/green-family/history-1.svg"}
          alt="green league"
          fill
          draggable={false}
          className="rounded-xl object-cover object-center"
        />
      </div>

      <SectionTitle title={["Бидний", "аваргууд"]} className="pb-8" />
      <Suspense fallback={<OurChampsSkeleton />}>
        <OurChamps />
      </Suspense>

      <SectionTitle title={["Бидний", "соёл"]} className="pb-8" />
      <Culture />
      <div className="mx-auto w-[240px] pt-16">
        <Button className="w-full" asChild>
          <Link href={"/career"}>Ногоон гэр бүлд нэгдэх</Link>
        </Button>
      </div>
    </div>
  );
};

export default LeaguePage;
