"use client";

import Image from "next/image";
import { readFile } from "@/lib/utils";

import { useSliderImages } from "../api/useSliderImages";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { EffectFade, Navigation, Autoplay } from "swiper/modules";

const sliderImages = ["/assets/home/web-banner.png"];

export const Slider = () => {
  const { images } = useSliderImages();

  const isFind = images.find((item) => item);

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      loop={true}
      effect={"fade"}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[EffectFade, Navigation, Autoplay]}
      pagination={{
        clickable: true,
      }}
      className="mySwiper aspect-[13/5] w-full"
    >
      {(isFind ? images : sliderImages).map(
        (image: string | undefined | null, index: number) => {
          if (!image) return null;
          return (
            <SwiperSlide className="relative w-full" key={index}>
              <Image
                fill
                src={readFile(image, "2500")}
                draggable={false}
                alt={`Slider image ${index + 1}`}
                className="object-cover object-center"
                priority={index === 0}
              />
            </SwiperSlide>
          );
        },
      )}
    </Swiper>
  );
};

export const SliderSkeleton = () => {
  return (
    <div className="relative aspect-[13/5] w-full">
      <Image
        fill
        src={"/assets/home/web-banner.png"}
        draggable={false}
        alt={`Slider image`}
        className="object-cover object-center"
      />
    </div>
  );
};
