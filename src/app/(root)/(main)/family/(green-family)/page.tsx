import Link from "next/link";
import { SectionTitle } from "@/components/section-title";
import { Button } from "@/components/ui/button";
import { Family } from "@/features/contents/components/gerbul";
import { Vid } from "@/components/videos";

const GreenFamilyPage = () => {
  return (
    <div className="w-full">
      <SectionTitle
        title={["Ногоон", " гэр бүл"]}
        className="mx-auto max-w-[1000px] pb-2 lg:text-[45px] lg:leading-[50px]"
      />

      <p className="mx-auto w-[91%] pb-6 text-center text-muted-foreground">
        Приус центр нэрээрээ танил болсон манай компани нь анх үйл ажиллагаагаа
        2008 оноос автомашины импорт худалдааны чиглэлээр эхэлсэн бөгөөд 2011
        оны 8 сарын 10-ний өдөр Цукуба ХХК болж албан ёсны үйл ажиллагаат
        компани болсон түүхтэй.
      </p>
      <Vid />
      <Family />
      <div className="mx-auto w-[240px] pt-16">
        <Button className="w-full" asChild>
          <Link href={"/career"}>Ногоон гэр бүлд нэгдэх</Link>
        </Button>
      </div>
    </div>
  );
};

export default GreenFamilyPage;
