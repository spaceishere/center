"use client";

import { Container } from "@/components/container";
import { serviceOptions } from "@/features/services/constant";
import Image from "next/image";
import Link from "next/link";
import { useService } from "@/features/services/store/useService";

const ServicesPage = () => {
  const { setOption } = useService();

  return (
    <div className="w-full">
      <Container className="space-y-6 pt-4 lg:pt-5">
        <p className="text-lg font-medium lg:text-xl xl:text-2xl">
          Засвар үйлчилгээ
        </p>

        <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {serviceOptions.map((option) => (
            <Link
              onClick={() => setOption(option.value)}
              href={"/services"}
              key={option.value}
              className="col-span-1 overflow-hidden rounded-[12px] border border-gray-200"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={option.image}
                  alt="option"
                  fill
                  className="object-cover object-center"
                />
              </div>

              <div className="p-3">
                <p className="text-lg font-medium">{option.label}</p>

                <p className="line-clamp-3 text-muted-foreground">Тайлбар</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
};
export default ServicesPage;
