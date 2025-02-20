import { ourExperiences } from "../constant";

import { SectionTitle } from "@/components/section-title";

export const OurExpierence = () => {
  return (
    <div className="w-full space-y-6" id="expierence">
      <div className="space-y-4">
        <SectionTitle title={["Бүрэн итгэл", " - Бидний туршлага"]} />

        <p className="mx-auto px-5 text-center text-muted-foreground sm:px-10 md:px-14 lg:max-w-[900px] lg:px-0 xl:max-w-[1100px]">
          Автомашины мэргэжлийн оношилгоо, инженерийн шийдэл бухий засвар
          уйлчилгээг олон улсын стандартын дагуу хэрэглегчийн хэрэгцээ
          шаардлагад нийцуулэн, уйллуулегчийн сэтгал ханамжийг нэмэгдуулех,
          нэгдсэн менежментийн тогтолцооны хэрэгжилт, ур нелеег тасралтгуй
          сайжруулан салбартаа тергуулэги байна. 250,000+ сэтгел ханамжтай
          уйлчлуулагч 300+ Автын салбарын мэргэжилтнууд 10+ Сулжээ авто засварын
          тев 10,000+ Баталгаат сэлбэг хэрэгсэл
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {ourExperiences.map(({ icon: Icon, ...item }, index) => (
          <div
            className="rounded-[14px] border border-gray-200 px-8 pb-6 pt-10"
            key={index}
          >
            <div className="mb-4 flex size-[50px] items-center justify-center rounded-full border border-gray-200">
              <Icon className="size-6 text-gray-500" />
            </div>

            <div className="-space-y-2">
              <p className="text-[40px] font-semibold text-primary">
                {item.count}
              </p>
              <p className="text-xs text-gray-500">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
