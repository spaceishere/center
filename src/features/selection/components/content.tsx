import { Chances } from "./chances";

export const Content = () => {
  return (
    <div className="col-span-1 space-y-6 md:col-span-3 lg:col-span-2 xl:col-span-3">
      <div className="w-full space-y-3">
        <p className="text-xl font-semibold">
          Манай байгууллагад та ажилласнаар
        </p>

        <p className="text-muted-foreground">
          Приус Центр нь автомашины засвар үйлчилгээ чиглэлээр 10 дахь жилдээ
          үйл ажиллагаа эрхлэн явуулж байна. Бидний үйл ажиллагааны цар хүрээ
          жилээс жилд улам өргөжин тэлсээр байна. Манай байгууллагын ололт,
          амжилт бүхэн нийт ажилтан албан хаагчдын тасралтгүй хөдөлмөрийн үр дүн
          юм. Бид амжилтаа улам бататган эрч хүчтэй, зөв хандлагатай, мэргэжлийн
          ур чадвар бүхий бүтээмж өндөртэй хамт олон болохын төлөө хичээн
          ажиллаж байна.
        </p>
      </div>

      <div className="w-full space-y-3">
        <p className="text-xl font-semibold">
          Манай байгууллагад та ажилласнаар
        </p>

        <Chances />
      </div>
    </div>
  );
};
