import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/section-title";
import { List } from "@/features/family/components/list";
import { HistoryCards } from "@/features/family/components/history-cards";
import { HistoryVideo } from "@/components/videos";

const HistoryPage = () => {
  return (
    <div className="w-full">
      <SectionTitle
        title={[
          "Хайбрид",
          " автомашиндаа сэтгэл амар байх нөхцлийг бид бий болгоно.",
        ]}
        className="mx-auto max-w-[1000px] pb-2 lg:text-[45px] lg:leading-[50px]"
      />

      <p className="w-full pb-6 text-center text-muted-foreground">
        Приус Центр нь 2011 оны 8 сарын 10-нд Ганданд байрлалтай Төв салбарыг
        анхлан үүсгэн байгуулж, өдгөө 13 салбартай сүлжээ авто засварын төв
        болтлоо өргөжин, 300 гаруй мэргэжлийн инженер, механик засварчдын
        бүрэлдэхүүнтэйгээр үйл ажиллагаагаа явуулж байна.
      </p>

      <HistoryVideo />

      <SectionTitle title={["Бидний", "тухай"]} />

      <p className="mt-3 w-full pb-6 text-center text-muted-foreground">
        Бид хосолсон хөдөлгүүрт автомашин тэр дундаа Prius маркийн автомашиныг
        Монголын зах зээлд анхлан нэвтрүүлж, зах зээлд таниулах ажлыг түүчээлэн,
        улмаар ПРИУС ЦЕНТР нэгдсэн үйлчилгээний төвийг байгуулан, автомашины
        импорт худалдаа, сэлбэг хэрэгсэл болон засвар үйлчилгээг нэг дор
        цогцлоосон анхдагч компани болсон юм. Улмаар приус автомашинд тулгардаг
        бүхий л хүндрэлийг шийдэхийн тулд хэрэглэгчиддээ тохирсон сервис
        үйлчилгээг жил бүр нэмэгдүүлсээр өдгөө 13 салбар 300 гаруй
        ажилчидтайгаар Улаанбаатар хотын 6 дүүрэгт үйл ажиллагаагаа эрхлэн
        явуулж байна.
      </p>
      <p className="w-full pb-6 text-center text-muted-foreground">
        Приус Центр нь “Хайбрид автомашиндаа сэтгэл амар байх нөхцлийг бий
        болгоно” эрхэм зорилготойгоор хайбрид автомашин эзэмшигч нартаа илүү тав
        тухтай, чанартай, найдвартай, шуурхай үйлчилгээ үзүүлэхийг зорин
        ажилладаг.
      </p>
      <p className="w-full pb-16 text-center text-muted-foreground">
        Бид 2011 оноос эхлэн хайбрид автомашины засвар үйлчилгээгээр дагнан
        ажиллаж, өндөр ур чадвартай инженер, засварчдаар багаа бүрдүүлэн, бүх
        төрлийн компьютер оношилгоо, засвар үйлчилгээг мэргэжлийн түвшинд
        гүйцэтгэхийн зэрэгцээ автын чиглэлээр мэргэжилтэн бэлддэг их , дээд
        сургууль, коллежуудтай хамтран ажиллаж залуу үеэ бэлтгэн, хөгжүүлэхэд
        хувь нэмрээ оруулсаар байна.
      </p>

      <HistoryCards />
      <List />
      <div className="mx-auto w-[240px] pt-16">
        <Button className="w-full" asChild>
          <Link href={"/career"}>Ногоон гэр бүлд нэгдэх</Link>
        </Button>
      </div>
    </div>
  );
};

export default HistoryPage;
