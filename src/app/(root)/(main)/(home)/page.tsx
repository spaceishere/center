import { Metadata } from "next";
import { Fragment, Suspense } from "react";

import { getCurrentUser } from "@/lib/actions";

import { Container } from "@/components/container";
import { Slider, SliderSkeleton } from "@/features/home/components/slider";
import { Car } from "@/features/home/components/car";
import {
  WhyAttend,
  WhyAttendSkeleton,
} from "@/features/home/components/why-attend";
import { OurExpierence } from "@/features/home/components/our-expierence";
import { Advices } from "@/features/home/components/advices";
import { Infos } from "@/features/home/components/infos";
import { Banner } from "@/features/home/components/banner";
import { Faq } from "@/features/home/components/faq";
import { ContentsSkeleton } from "@/components/content-skeleton";
import { ServicesForm } from "@/features/services/components/services-form";

export const revalidate = 300;

export function generateMetadata(): Metadata {
  return {
    title: "Нүүр хуудас",
  };
}

const HomePage = async () => {
  const user = await getCurrentUser();

  return (
    <Fragment>
      <Suspense fallback={<SliderSkeleton />}>
        <Slider />
      </Suspense>

      <Container className="w-full pb-0 pt-0">
        <ServicesForm cars={[]} currentUser={user} />

        <div className="w-full space-y-[60px] pb-20 md:space-y-[138px]">
          <Car />

          <Suspense fallback={<WhyAttendSkeleton />}>
            <WhyAttend />
          </Suspense>

          <OurExpierence />

          <Suspense
            fallback={
              <ContentsSkeleton
                buttonLabel={"Бүх зөвлөгөө"}
                titles={["Приус Центр", " зөвлөж байна"]}
              />
            }
          >
            <Advices />
          </Suspense>

          <Suspense
            fallback={
              <ContentsSkeleton
                titles={["Мэдээ", "мэдээлэл"]}
                buttonLabel={"Бүх мэдээ"}
              />
            }
          >
            <Infos />
          </Suspense>

          <Suspense fallback={<></>}>
            <Faq />
          </Suspense>

          <Banner />
        </div>
      </Container>
    </Fragment>
  );
};

export default HomePage;
