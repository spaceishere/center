import Image from "next/image";
import { redirect } from "next/navigation";

import { getScores } from "@/features/profile/api/getScores";
import { getMetadata } from "@/lib/metadata";

import { Scores } from "@/features/profile/components/scores";

export async function generateMetadata() {
  return await getMetadata("Хайбрид пойнт");
}

const HybridPage = async () => {
  const { user, scores } = await getScores();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="flex w-full flex-col gap-y-9">
      <div className="space-y-6 rounded-[16px] border p-4">
        <div className="space-y-1.5 text-[14px]">
          <p className="font-semibold">Лояалти хөтөлбөрт хамрагдсанаар:</p>
          <p>
            Хөтөлбөрийн үндсэн консепц нь үйлчлүүлэгч Приус Центрээр үйлчилгээ
            авах бүртээ худалдан авалтын үнийн дүнд тохирсон эсвэл өөрийн идэвх
            чармайлтад (цахим хуудсанд зар оруулах, хувийн мэдээллээ бүрэн
            өгсөн) тохирсон оноог цуглуулна. Улмаар энэхүү онооны дүндээ
            тохирсон бэлэг эсвэл урамшууллыг Приус Центрээр хүлээн авна.
          </p>
        </div>
        <div className="space-y-1.5 text-[14px]">
          <p className="font-semibold">Хэрхэн оноо цуглуулах вэ?</p>
          <p>
            Hybrid point: Приус Центрээс авсан бүтээгдэхүүн, үйлчилгээний нийт
            үнийн дүнгийн 0.0001 хувьтай тэнцэх дүн бонус оноо болон орно. Жишээ
            нь 10,000 төгрөг = 1 Hybrid point, 100,000 төгрөг = 10 Hybrid point
          </p>
        </div>
        <div className="space-y-1.5 text-[14px]">
          <p className="font-semibold">Хэрхэн оноогоо ашиглах вэ?</p>
          <p>
            Та цуглуулсан оноогоороо{" "}
            <span className="text-base text-primary">НАЙЗДАА БЭЛГЭЛЭХ</span>{" "}
            боломжтой.
          </p>
        </div>
      </div>

      <div className="grid w-full grid-cols-1 rounded-[16px] bg-gray-100 p-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
        <div className="flex items-center justify-center gap-x-4 gap-y-3 border-b p-4 sm:flex-col sm:border-b-0 sm:border-r lg:flex-row lg:border-b lg:border-r-0 xl:flex-col xl:border-b-0 xl:border-r">
          <Image
            src={"/assets/profile/buyIcon.svg"}
            alt="buy"
            width={40}
            height={40}
            className="object-contain object-center"
          />
          <p className="text-center text-gray-700">Худалдан авалт +10</p>
        </div>
        <div className="flex items-center justify-center gap-x-4 gap-y-3 border-b p-4 sm:flex-col sm:border-b-0 sm:border-r lg:flex-row lg:border-b lg:border-r-0 xl:flex-col xl:border-b-0 xl:border-r">
          <Image
            src={"/assets/profile/bookingTimeIcon.svg"}
            alt="buy"
            width={40}
            height={40}
            className="object-contain object-center"
          />
          <p className="text-center text-gray-700">Цаг захиалга +25</p>
        </div>
        <div className="flex items-center justify-center gap-x-4 gap-y-3 p-4 sm:flex-col lg:flex-row xl:flex-col">
          <Image
            src={"/assets/profile/buyIcon.svg"}
            alt="buy"
            width={40}
            height={40}
            className="object-contain object-center"
          />
          <p className="text-center text-gray-700">Засвар үйлчигээ +25</p>
        </div>
      </div>

      <div className="w-full space-y-4">
        <p className="text-lg font-semibold text-gray-900">Онооны түүх</p>

        <Scores scores={scores} />
      </div>
    </div>
  );
};

export default HybridPage;
