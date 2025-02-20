"use client";

import Image from "next/image";
import { readFile } from "@/lib/utils";

import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

interface MobileBannerSliderProps {
  urls: string[];
}

export const MobileBannerSlider = ({ urls }: MobileBannerSliderProps) => {
  return (
    <div className="w-full shadow-sm lg:hidden">
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
      >
        {urls.map((url, index) => (
          <SwiperSlide
            key={index}
            className="relative aspect-video w-full rounded-full"
          >
            <Image
              src={readFile(url, "700")}
              fill
              alt="product image"
              className="rounded-xl object-cover object-center"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
